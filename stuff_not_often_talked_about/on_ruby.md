

"Ruby’s worst maintenance problem is that every gem that needs even reasonable levels of performance is written in C. 
These native extensions are built as bundler installs gems, and are prone to breakage as libraries that they’re linked against on the system are updated. 
I can’t even count how many hours I’ve sunk into fixing eventmachine builds because something changed in OpenSSL"

- https://brandur.org/fragments/going-static

