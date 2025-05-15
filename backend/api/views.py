import os
import numpy as np
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from keras.models import load_model

from keras.utils import load_img, img_to_array
from PIL import Image
import io


model_name = "MobileNetV2"
model = load_model(f"./models/{model_name}.h5")

class_labels = [
    "นกแก้วเทาแอฟริกัน",
    "นกแก้วบลูแอนด์โกลด์มาคอว์",
    "นกพิราบบูดาเปสต์",
    "นกกระเรียนหงอนพู่",
    "เป็ดเทศ",
    "นกแก้วริงเน็ค(เหลือง)",
]


@api_view(['POST'])
@parser_classes([MultiPartParser])
def predict_image(request):
    img_file = request.FILES.get('image')
    if not img_file:
        return Response({'error': 'No image provided'}, status=400)

    try:
        # Convert uploaded file to BytesIO
        img_bytes = io.BytesIO(img_file.read())

        # Load image as PIL Image and convert to numpy
        if model_name == "EfficientNetB4":
            img = Image.open(img_bytes).convert('RGB')
            img = img.resize((380, 380))
            img_array = np.array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0
        else:
            img = load_img(img_bytes, target_size=(224, 224))
            img_array = img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)
            img_array = img_array / 255.0

    except Exception as e:
        return Response({'error': 'Invalid image file', 'details': str(e)}, status=400)

    # Predict
    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0])
    predicted_label = class_labels[predicted_index]
    confidence = float(predictions[0][predicted_index])

    return Response({
        'predicted_class': predicted_label,
        'confidence': confidence,
        'predictions': {class_labels[i]: float(predictions[0][i]) for i in range(len(class_labels))}
    })
