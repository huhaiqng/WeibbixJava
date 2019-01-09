package com.yunwei.weibbix.impl;

import com.yunwei.weibbix.entity.Host;
import com.yunwei.weibbix.mapper.HostMapper;
import com.yunwei.weibbix.service.HostService;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.Format;
import java.util.Date;

@Service
public class HostImpl implements HostService{

    @Autowired(required = false)
    HostMapper hostMapper;

    @Override
    public void importHost(String fileName, MultipartFile file) throws Exception {
        boolean isExcel2003 = true;
        if (fileName.matches("^.+\\.(?i)(xlsx)$")) {
            isExcel2003 = false;
        }
        InputStream is = file.getInputStream();
        Workbook wb = null;
        if (isExcel2003) {
            wb = new HSSFWorkbook(is);
        } else {
            wb = new XSSFWorkbook(is);
        }
        Sheet sheet = wb.getSheetAt(0);
        Host host = new Host();
        for(int r=1;r<=sheet.getLastRowNum();r++){
            Row row = sheet.getRow(r);
            if(row == null){
                continue;
            }
            host.setHostId(Long.toString(System.nanoTime()));
            host.setHostName(row.getCell(0).getStringCellValue());
            host.setIp(row.getCell(1).getStringCellValue());
            host.setEnvType(row.getCell(2).getStringCellValue());
            host.setHostGroup(row.getCell(3).getStringCellValue());
            host.setPlace(row.getCell(4).getStringCellValue());
            host.setRootPassword(row.getCell(5).getStringCellValue());
            host.setAllocated(row.getCell(6).getBooleanCellValue());
            host.setOsVersion(row.getCell(7).getStringCellValue());
            host.setConfiguration(row.getCell(8).getStringCellValue());
            host.setHostType(row.getCell(9).getStringCellValue());
            if(row.getCell(10) != null){
                host.setEsxiIp(row.getCell(10).getStringCellValue());
            }
            host.setEnabled(row.getCell(11).getBooleanCellValue());
            hostMapper.importHostSQL(host);
        }
    }
}
