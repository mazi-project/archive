# MAZI Prinzessinengarten

Installation for the Mazi Prinzessinengarten Event



### enable/disable internet and redirect all trafic to rasp pi

- go to network -> wifi -> "the wan wifi" -> disable
- login by ssh : `ssh root@192.168.72.1` uncomment line in */etc/dnsmasq.conf*: `address=/#/192.168.72.2`

