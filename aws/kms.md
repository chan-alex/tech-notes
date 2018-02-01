
Good overview
--------------
https://blog.fugue.co/2015-04-21-aws-kms-secrets.html

KMS is composed of a set of API operations for creating, managing, and using a relatively small set of encryption keys, called Customer Master Keys (here, "master keys"). 
There are a bunch of operations for managing grants and policy around who can use which keys for what operations, but the fundamental operations in KMS are CreateKey, 
Encrypt, and Decrypt. CreateKey will generate a key in the KMS service that will never leave the KMS service. 

Once you create a key in KMS, you can disable it, you can set permissions on who can use it, you can alias it, but you cannot export it. 
In order to use the keys for cryptography, you use the Encrypt and Decrypt API calls. This is the core security value proposition in KMS: no one can run off with the keys.

In fact, this is the same model that is used by expensive Hardware Security Modules (HSMs): you generate a key in the device; once it's generated, it never leaves. 
Instead, you send the data to encrypt/decrypt to the device and say "encrypt this blob with key foo," and the HSM returns the resulting ciphertext or plaintext.

In the case of KMS, this is done using the Encrypt API operation. You pass the service the handle of the KMS master key that you want to use for encryption, along with up to 4KB of data to encrypt. 
You get back a blob containing ciphertext and a key reference, which can later be passed to KMS's Decrypt operation, which will return the plaintext

the service really boils down to creating a key, then using it to encrypt and decrypt 4KB blobs of data.


Using KMS to encrypt large amounts of data:

1) Locally generate a random encryption key (or use the excellent GenerateDataKey operation). We will call this your data key.

2) Use the data key to encrypt your data.

3) Use KMS to encrypt your data key with one of your master keys. This is called key wrapping. The encrypted data key is now a "wrapped key."

4) Discard the plaintext datakey.


To decrypt data, you simply:

1) Fetch the wrapped data key and the encrypted data.

2) Use KMS to decrypt the wrapped data key.

3) Use the decrypted data key to decrypt the encrypted data.


This is why KMS refers to the its keys as "Master Keys"–they are not used to encrypt data, but are instead used to encrypt keys that encrypt data. 
A single master key can protect many keys, and, in fact, every independent datum in your system can have its own unique data key.


Examples of usage
-----------------
http://www.rightbrainnetworks.com/blog/keeping-secrets-safe-with-kms/
https://mariadb.com/kb/en/library/aws-key-management-encryption-plugin-setup-guide/
https://github.com/fugue/credstash 
