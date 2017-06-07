# SOCK5

ssh -D 8888 alexchan@<the ip address of the SOCKS server>

# Do a check to if SOCKS working correctly
curl --proxy socks://localhost:8888 http://www.whatsmyip.net/ |grep "Address is"


# Open up a webserver to use this SOCKS connections. This is an example for MACOSX chrome
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --proxy-server=socks5://127.0.0.1:8888


