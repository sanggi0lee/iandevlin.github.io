Create an App Package for webOS TV Platform
===========================================

1. Download and Install webOS TV SDK Minimal Installer from [webOS TV SDK Download][1].
2. Create package with the following command.

       $ cd ..
       $ ares-package video-player-with-captions

3. Now you can find the app package in the upper directory.

       $ ls ../*.ipk
       ../com.sample.caption_1.0.0_all.ipk

Deploying and Testing the App Package
=====================================

Refer to the [Deploying webOS TV Web App][2] page.


[1]: https://webostv.developer.lge.com/sdk/installation/download-installer/
[2]: https://webostv.developer.lge.com/sdk/command-line-interface/testing-web-app-cli/
