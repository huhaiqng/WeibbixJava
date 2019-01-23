package com.yunwei.weibbix.impl;

import com.jcraft.jsch.*;
import com.yunwei.weibbix.entity.OutMessage;
import com.yunwei.weibbix.service.ShellCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class ShellCommandImpl implements ShellCommandService{

    @Autowired(required = false)
    private SimpMessagingTemplate template;

    @Override
    public void installZabbixAgetnd(String topic_uri) {
        String USER="root";
        String PASSWORD="bsbnet";
        String HOST="192.168.1.224";
        int DEFAULT_SSH_PORT=22;

        try{
            JSch jsch=new JSch();
            Session session = jsch.getSession(USER,HOST,DEFAULT_SSH_PORT);
            session.setPassword(PASSWORD);
            // username and password will be given via UserInfo interface.
            session.setUserInfo(new MyUserInfo());
            session.connect();

            String command="sh /root/install_zabbix.sh";
            Channel channel=session.openChannel("exec");
            ((ChannelExec)channel).setCommand(command);

            // X Forwarding
            // channel.setXForwarding(true);

            //channel.setInputStream(System.in);
            channel.setInputStream(null);

            //channel.setOutputStream(System.out);

            //FileOutputStream fos=new FileOutputStream("/tmp/stderr");
            //((ChannelExec)channel).setErrStream(fos);
            ((ChannelExec)channel).setErrStream(System.err);

            InputStream in=channel.getInputStream();
            InputStream es=((ChannelExec) channel).getErrStream();

            channel.connect();

            byte[] tmp=new byte[1024];
            while(true){
                while(in.available()>0){
                    int i=in.read(tmp, 0, 1024);
                    if(i<0)
                        break;
//                    System.out.print(new String(tmp, 0, i));
//                    template.convertAndSend("/topic/server_info",new OutMessage(new String(tmp, 0, i)));
                    template.convertAndSend(topic_uri,new OutMessage(new String(tmp, 0, i)));
                }
                while(es.available()>0){
                    int e=es.read(tmp, 0, 1024);
                    if(e<0)
                        break;
//                    System.out.print(new String(tmp, 0, e));
//                    template.convertAndSend("/topic/server_info",new OutMessage(new String(tmp, 0, e)));
                    template.convertAndSend(topic_uri,new OutMessage(new String(tmp, 0, e)));
                }
                if(channel.isClosed()){
                    if(in.available()>0)
                        continue;
                    System.out.println("exit-status: "+channel.getExitStatus());
                    break;
                }
                try{
                    Thread.sleep(1000);
                }
                catch(Exception ee){}
            }
            channel.disconnect();
            session.disconnect();
        }
        catch(Exception e){
            System.out.println(e);
        }
    }

    public static class MyUserInfo implements UserInfo {
        @Override
        public String getPassphrase() {
            System.out.println("getPassphrase");
            return null;
        }
        @Override
        public String getPassword() {
            System.out.println("getPassword");
            return null;
        }
        @Override
        public boolean promptPassword(String s) {
            System.out.println("promptPassword:"+s);
            return false;
        }
        @Override
        public boolean promptPassphrase(String s) {
            System.out.println("promptPassphrase:"+s);
            return false;
        }
        @Override
        public boolean promptYesNo(String s) {
            System.out.println("promptYesNo:"+s);
            return true;//notice here!
        }
        @Override
        public void showMessage(String s) {
            System.out.println("showMessage:"+s);
        }
    }
}
