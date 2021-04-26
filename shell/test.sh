# xvfb-run --server-args="-screen 0, 4800x2160x24" -a google-chrome --no-sandbox --window-siez=4800,2160
# xvfb-run --server-args="-screen 0, 4800x2160x24" -a google-chrome --disable-setuid-sandbox --disable-gpu --no-sandbox --kiosk --display=127.0.0.1:99 --window-siez=4800,2160 --app=http://github.com

# ffmpeg -r 30 -f x11grab -draw_mouse 0 -s 1280x800 -i 127.0.0.1:99 -c:v libvpx -quality realtime -cpu-used 0 -b:v 384k -qmin 10 -qmax 42 -maxrate 384k -bufsize 1000k -an screen.webm

# 设置当前启动显示的环境变量
# export DISPLAY

# 检测当前服务是否启动
# xdpyinfo -display :10086 >/dev/null 2>&1 && echo "In use" || echo "Free"

# 启动虚拟显示服务
Xvfb :10086 -screen 0 1920x1080x16 -noreset

# 启动浏览器
google-chrome --disable-setuid-sandbox --disable-gpu --no-sandbox --kiosk --display=10086 --window-siez=4800,2160 --app=https://jd.com

ffmpeg -f x11grab -r 25 -s 1920x1080 -vcodec copy -bsf:v hevc_metadata=num_ticks_poc_diff_one -i :10086 tempAsset/out_222.mpeg -y