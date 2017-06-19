127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

# Main interface - eth0
{% for host in hostvars|sort %}
{{ "%-15s  %s"| format( hostvars[host]['ansible_eth0']['ipv4']['address']  , hostvars[host].ec2_tag_Name ) }}
{% endfor %}

# eth1
{% for host in hostvars|sort %}
{{ "%-15s  %s-mgmt"| format( hostvars[host]['ansible_eth1']['ipv4']['address']  , hostvars[host].ec2_tag_Name ) }}
{% endfor %}

# eth2
{% for host in hostvars|sort if hostvars[host]['ansible_eth2'] is defined %}
{{ "%-15s  %s-eth2"| format( hostvars[host]['ansible_eth2']['ipv4']['address']  , hostvars[host].ec2_tag_Name ) }}
{% endfor %}
