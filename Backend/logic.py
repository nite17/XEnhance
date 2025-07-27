import os
from keras.models import load_model
from keras.metrics import MeanAbsoluteError
import cv2  # ✅ Corrected import
import numpy as np

def process_image(image_path):
    """
    Processes the input image and performs predictions using the model.
    """
    # ✅ Ensure model path is correct
    model_path = "C:\\Users\\Asus\\Desktop\\Yantra2\\Backend\\model\\denoiser_cnn_epoch_30-gaussian.h5"
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")

    model = load_model(model_path, custom_objects={"mae": MeanAbsoluteError()})

    # ✅ Ensure image is loaded correctly
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if image is None:
        raise ValueError(f"Failed to load image. Check if the path exists: {image_path}")

    # ✅ Resize, Normalize, and Prepare Image
    image = cv2.resize(image, (256, 256))
    image_array = image.astype('float32') / 255.0
    image_array = np.expand_dims(image_array, axis=(0, -1))  # Add batch & channel dimensions

    # Perform prediction
    denoised_image_array = model.predict(image_array)[0]

    # Postprocess output
    denoised_image = (denoised_image_array.squeeze() * 255).astype(np.uint8)

    # ✅ Ensure output directory exists
    output_dir = os.path.join(os.path.dirname(__file__), "outputs")
    os.makedirs(output_dir, exist_ok=True)

    # ✅ Save output image
    output_path = os.path.join(output_dir, "denoised_image.png")
    cv2.imwrite(output_path, denoised_image)

    if not os.path.exists(output_path):  # Debugging check
        raise ValueError("Error: Image not saved correctly")

    return output_path

# Example usage (for testing)
if __name__ == "__main__":
    test_image_path = os.path.join(os.path.dirname(__file__), "uploads", "test_image.png")
    if not os.path.exists(test_image_path):
        raise FileNotFoundError(f"Test image not found at {test_image_path}")

    try:
        output = process_image(test_image_path)
        print(f"Denoised image saved at: {output}")
    except Exception as e:
        print(f"Error processing image: {e}")
