rm -rf public
hugo --minify
s3deploy -source=public/ -region=eu-north-1 -bucket=staticbattery.com -acl='public-read' -distribution-id=E15NLNM65B1T1F 