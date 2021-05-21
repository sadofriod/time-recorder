#!/bin/bash

#check pid
check=`ps -ef|grep -v grep |grep tigagent|wc -l`
if [ $check != 0 ];then    
	echo "tig has installed"    
	exit 0
fi

echo "install begin"

download="storage.jd.local/ops-soft/tigagent.tar.gz"
kpatch=`lsmod |grep kpatch_cfs_pick_null_pointer|wc -l`
if [ $kpatch != 0 ];then
	echo "Tigagent have a file conflict with kpatch_cfs_pick_null_pointer."
	echo "uninstall kpatch_cfs_pick_null_pointer,please."
	exit 250
fi


if [ -f "/export/tiger/tigagent" ];then
	echo "Delete old tigagent file..."
	/bin/rm -rf /export/tiger/tigagent
fi

if [ -f "/export/tiger/auth/cmd_agent" ];then
	echo "Delete old cmd_agent file..."
	/bin/rm -rf /export/tiger/auth/cmd_agent
fi

if [ -f "/export/tiger/tigStart.sh" ];then
	echo "Delete old cmd_agent file..."
	/bin/rm -rf /export/tiger/tigStart.sh
fi

sed -i '/tigStart.sh/d' /etc/crontab


#install tigagent
mkdir -p /export/tiger/
cd /tmp/
\rm -f tigagent*
wget -q $download
cd /export/tiger/
tar zxvf /tmp/tigagent.tar.gz

#start tigagent
chmod +s /export/tiger/auth/cmd_agent
/export/tiger/tigagent
echo "Start tigagent..."
echo "15 * * * * root /bin/bash /export/tiger/tigStart.sh >/dev/null 2>&1 &" >> /etc/crontab

echo "install done"
exit 0

