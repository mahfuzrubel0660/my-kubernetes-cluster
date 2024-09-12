#!/bin/bash
zip -r /backup/xfusioncorp_beta.zip /var/www/html/beta
scp /backup/xfusioncorp_beta.zip tony@stbkp01:/backup/
