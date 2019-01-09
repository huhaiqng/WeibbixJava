package com.yunwei.weibbix.mapper;

import com.yunwei.weibbix.entity.Host;
import org.apache.ibatis.annotations.Param;

import java.util.List;

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

    public Integer selectALLHostsCountSQL(@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByEnvCountSQL(@Param("envType") String envType,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByGroupCountSQL(@Param("hostGroup") String hostGroup,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByIpCountSQL(@Param("ip") String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByEnvGroupCountSQL(@Param("envType")String envType,@Param("hostGroup")String hostGroup,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByEnvIpCountSQL(@Param("envType")String envType,@Param("ip")String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByGroupIpCountSQL(@Param("hostGroup")String hostGroup,@Param("ip")String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
    public Integer selectHostsByEnvGroupIpCountSQL(@Param("envType")String envType,@Param("hostGroup")String hostGroup,@Param("ip")String ip,@Param("beforeNum") Integer beforeNum,@Param("hostsCount")Integer hostCount);
}
