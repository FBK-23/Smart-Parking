import cv2
from local_utils import detect_lp
from os.path import splitext
from keras.models import model_from_json
from easyocr import Reader
from easyocr import Reader
import cv2
import re
import sys
import matplotlib.pyplot as plt

def load_model(path):
    try:
        path = splitext(path)[0]
        with open('%s.json' % path, 'r') as json_file:
            model_json = json_file.read()
        model = model_from_json(model_json, custom_objects={})
        model.load_weights('%s.h5' % path)
        return model
    except Exception as e:
        print(e)
        
wpod_net_path = "C:\\Users\\fbargui\\Desktop\\TalanParcHelper-talan-parking-vesion-beta\\ParHelper-backend\\ocr\\wpod-net.json"
wpod_net = load_model(wpod_net_path)

def preprocess_image(img, resize=False):
    try:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = img / 255
        if resize:
            img = cv2.resize(img, (224,224))
        return img
    except Exception as e:
        print(e)

def get_plate(image, Dmax=300, Dmin=256):
    try:
        vehicle = preprocess_image(image)
        ratio = float(max(vehicle.shape[:2])) / min(vehicle.shape[:2])
        side = int(ratio * Dmin)
        bound_dim = min(side, Dmax)
        _ , LpImg, _, cor = detect_lp(wpod_net, vehicle, bound_dim, lp_threshold=0.5)
        return LpImg, cor
    except Exception as e:
        print(e)

try:
    photo = sys.argv[1]
    img = cv2.imread(photo)
    reader = Reader(['ar'], gpu=False)
    readerfr= Reader(['fr'], gpu=False)
    LpImg, cor = get_plate(img)
    
    plt.imshow(LpImg[0])
    plt.axis(False)
    plt.savefig("LP.jpg",dpi=150)

    detection = reader.readtext("LP.jpg", paragraph="False")
    detection2 = readerfr.readtext("LP.jpg", paragraph="False")


    if len(detection)>0:
        s_ar=detection[0][1]
        s_fr=detection2[0][1]
        l_arabe=re.split(r'(\d+)', s_ar)
        l_fr=re.split(r'(\d+)', s_fr)
        list_digitsfr=[]
        for el in l_fr:
            if el.strip().isdigit():
                list_digitsfr.append(el)
        list_digits=[]
        for el in l_arabe:
            if el.strip().isdigit():
                list_digits.append(el)
        if len(list_digits)==2:
                mat =list_digits[1]+" TUN "+list_digits[0]
        elif len(list_digitsfr)==1:
            mat=list_digitsfr[0]
        elif len(list_digitsfr)>1 and len(list_digits)==1:
            mat=list_digits[0]
        else:
            mat=""
    else:
        mat=""

    print(mat)

except Exception as e:
        print(e)



