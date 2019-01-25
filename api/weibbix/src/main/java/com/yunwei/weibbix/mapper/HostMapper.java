package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.Host;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface HostMapper {
    public void importHostSQL(Host host);

    public List<Host> selectALLHostsSQL(@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByEnvSQL(@Param("envType") String envType,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByGroupSQL(@Param("hostGroup") String hostGroup,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByIpSQL(@Param("ip") String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByEnvGroupSQL(@Param("envType")String envType,@Param("hostGroup")String hostGroup,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByEnvIpSQL(@Param("envType")String envType,@Param("ip")String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByGroupIpSQL(@Param("hostGroup")String hostGroup,@Param("ip")String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public List<Host> selectHostsByEnvGroupIpSQL(@Param("envType")String envType,@Param("hostGroup")String hostGroup,@Param("ip")String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);

    public Integer selectALLHostsCountSQL();
    public Integer selectHostsByEnvCountSQL(@Param("envType") String envType);
    public Integer selectHostsByGroupCountSQL(@Param("hostGroup") String hostGroup);
    public Integer selectHostsByIpCountSQL(@Param("ip") String ip);
    public Integer selectHostsByEnvGroupCountSQL(@Param("envType")String envType,@Param("hostGroup")String hostGroup);
    public Integer selectHostsByEnvIpCountSQL(@Param("envType")String envType,@Param("ip")String ip);
    public Integer selectHostsByGroupIpCountSQL(@Param("hostGroup")String hostGroup,@Param("ip")String ip);
    public Integer selectHostsByEnvGroupIpCountSQL(@Param("envType")String envType,@Param("hostGroup")String hostGroup,@Param("ip")String ip);
    public void deleteHostSQL(@Param("hostId") String hostId);
    public void updateHostStatusSQL(@Param("hostId")String hostId,@Param("enabled") Boolean enabled);

    public List<Map> selectGroupNotAllocatedHostsSQL(@Param("hostGroup") String hostGroup, @Param("envType")String envType);
    //将主机分配状态
    public void updateHostAllocatedSQL(@Param("hostId") String hostId,@Param("alloacted") boolean alloacted);
    public String selectHostIdByIpSQL(@Param("ip") String ip);
}
