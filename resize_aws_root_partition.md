
For Centos 6 on AWS  
-------------------

One method: use fdisk to resize root partition to the size that you want and reboot.
One reboot, the cloud-init script should auto resize the root filesystem (ext4)


To script, can use sfdisk.


# partition table of /dev/xvda
unit: sectors

/dev/xvda1 : start=     2048, size= new_sector_size, Id=83, bootable
/dev/xvda2 : start=        0, size=        0, Id= 0
/dev/xvda3 : start=        0, size=        0, Id= 0
/dev/xvda4 : start=        0, size=        0, Id= 0



The new_sector_size is calculated as follows:  

1 Sector = 512 Bytes  
new_sector_size = (volume size in Gigabye * 1024 * 1024 * 1024) / 512  


The commands:  

sfdisk -f /dev/xvda < sfdisk_script
reboot


