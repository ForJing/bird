import os
#'像素鸟FlappyBird游戏源码-num2_爱给网_aigei_com.png'
arr = os.listdir()[1:]
dir = os.path.dirname(os.path.realpath(__file__))

a = 0
for i in arr:
    os.rename(dir + "\\" + i, dir + "\\" + "number" + str(a) + ".jpg")
    a+=1
    print(dir + "\\" + i)
