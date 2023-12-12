/*

IP Address and Subnet Mask: You can use the command prompt or terminal on your computer and type ipconfig (for Windows) or ifconfig (for Linux/macOS) to display your system's IP address and subnet mask.


Network Address: To find the network address (also known as the network ID), you'll need the IP address and subnet mask. The network address can be calculated by performing a bitwise AND operation between the IP address and the subnet mask.

For example, if your IP address is 192.168.1.25 and your subnet mask is 255.255.255.0, the network address would be 192.168.1.0.


Maximum Number of Systems: The maximum number of systems possible on a network depends on the subnet mask and the class of IP addresses being used (Class A, B, or C). For example, a subnet mask of 255.255.255.0 (commonly used in Class C networks) allows for 254 hosts (2^(32 - 24) - 2) on the network.


Range of IP Addresses Available: The range of available IP addresses for hosts on a network can be calculated based on the network address and subnet mask. It usually starts from the network address + 1 and ends at the broadcast address - 1.

For instance, in the example where the network address is 192.168.1.0 and the subnet mask is 255.255.255.0, the available IP addresses for hosts range from 192.168.1.1 to 192.168.1.254.

 */