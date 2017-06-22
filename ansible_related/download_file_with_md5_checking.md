
Below is one example.



- name: Download md5 file
  command: "/usr/bin/wget {{ download.md5 }} -O /tmp/maven.md5"
  args:
    warn: false


# Read in the md5 file
- slurp:
    src: /tmp/download.md5
  register: slurpfile


# Set a fact
- set_fact:
    md5_value: "{{ slurpfile['content'] | b64decode }}"


# Use the get_url to download the file while checking the md5 value
- name: Download the file
  get_url:
    url: "{{ download_url }}"
    dest: /tmp/maven.tar.gz
    checksum: "md5:{{ md5_value }}"
    force: true
