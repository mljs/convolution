import cv2
import numpy as np

img = np.zeros((1, 4))
img[0, 0] = 0
img[0, 1] = 1
img[0, 2] = 2
img[0, 3] = 3

print(img)

kernel = np.zeros((1, 3))
kernel[0, 0] = -1
kernel[0, 1] = 1
kernel[0, 2] = -1


print(kernel)

result = cv2.filter2D(img, -1, kernel, borderType=cv2.BORDER_CONSTANT)
print(result)
