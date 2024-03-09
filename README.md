# GuardianVistaHN

# PaperTrail API Documentation
[https://www.papertrail.com/help/search-api](https://www.papertrail.com/help/search-api)

## event search API response ex:

```json
"id": "1701774016186081368",
"source_ip": "45.182.20.210",
"program": "logger",
"message": "logver=702071577 timestamp=1709671765 devname=\"FortiGate-100E_NHBC\" devid=\"FG100ETK20002776\" vd=\"root\" date=2024-03-05 time=14:49:25 eventtime=1709671765232841302 tz=\"-0600\" logid=\"0419016384\" type=\"utm\" subtype=\"ips\" eventtype=\"signature\" level=\"alert\" severity=\"low\" srcip=167.94.138.125 srccountry=\"United States\" dstip=10.10.10.254 dstcountry=\"Reserved\" srcintf=\"wan1\" srcintfrole=\"wan\" dstintf=\"DMZ1\" dstintfrole=\"lan\" sessionid=97694871 action=\"dropped\" proto=6 service=\"HTTP\" policyid=10 poluuid=\"8bc9dbbe-0486-51ed-2e22-f90b303fc1f2\" policytype=\"policy\" attack=\"Censys.io.Scanner\" srcport=55618 dstport=8443 hostname=\"190.185.112.195\" url=\"/version\" agent=\"Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)\" httpmethod=\"GET\" direction=\"outgoing\" attackid=50899 profile=\"high_security\" ref=\"http://www.fortinet.com/ids/VID50899\" incidentserialno=269674812 msg=\"tools: Censys.io.Scanner\" crscore=5 craction=32768 crlevel=\"low\" ",
"received_at": "2024-03-05T14:49:25-06:00",
"generated_at": "2024-03-05T14:49:25-06:00",
"display_received_at": "Mar 05 14:49:25",
"source_id": 14092704524,
"source_name": "45.182.20.210",
"hostname": "45.182.20.210",
"severity": "Alert",
"facility": "Local7"
```
