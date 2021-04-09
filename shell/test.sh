xvfb-run --server-args="-screen 0, 4800x2160x24" -a google-chrome --no-sandbox --window-siez=4800,2160 
# xvfb-run --server-args="-screen 0, 4800x2160x24" -a google-chrome --disable-setuid-sandbox --disable-gpu --no-sandbox --kiosk --display=127.0.0.1:99 --window-siez=4800,2160 --app=http://github.com  


ffmpeg -r 30 -f x11grab -draw_mouse 0 -s 1280x800 -i 127.0.0.1:99 -c:v libvpx -quality realtime -cpu-used 0 -b:v 384k -qmin 10 -qmax 42 -maxrate 384k -bufsize 1000k -an screen.webm