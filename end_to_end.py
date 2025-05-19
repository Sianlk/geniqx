from Crypto.Cipher import AES

def encrypt_message(msg, key):
    cipher = AES.new(key[:16].encode(), AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(msg.encode())
    return ciphertext
