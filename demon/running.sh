lockfile=/home/ubuntu/dofitario/Dofitario/demon/tmp/void.lock

rm -rf /home/ubuntu/dofitario/Dofitario/demon/tmp/

mkdir /home/ubuntu/dofitario/Dofitario/demon/tmp/

while true
do
	litems=`ls /home/ubuntu/dofitario/Dofitario/demon/tmp/ | wc -l`
	echo "$litems"
	if [[ "$litems" == "0" ]]
	then
		if (set -o noclobber; echo "$$" > "$lockfile") 2> /dev/null;
		then
			trap 'rm -f "$lockfile"; exit $?' INT TERM EXIT
			echo "Launching..."
				python /home/ubuntu/dofitario/Dofitario/server.py

		rm -f "$lockfile"
		trap - INT TERM EXIT

		else
			echo "Running..."

		fi
	fi
	sleep 10
done
