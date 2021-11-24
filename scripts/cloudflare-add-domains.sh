#!/bin/bash

source .env

for domain in $(cat domains.txt)
do
  echo Domain $domain

  flarectl --json zone create --zone $domain

  zone_id=$(flarectl --json zone info --zone $domain | jq -r ".[0].ID")

  echo Zone ID $zone_id

  flarectl --json dns create --zone $domain --type CNAME --name $domain --content domains.vane.life --proxy
  flarectl --json dns create --zone $domain --type CNAME --name www.$domain --content domains.vane.life --proxy

  curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$zone_id/settings/ssl" \
     -H "X-Auth-Email: $CF_API_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"value":"flexible"}'

  curl -X PATCH "https://api.cloudflare.com/client/v4/zones/$zone_id/settings/always_use_https" \
     -H "X-Auth-Email: $CF_API_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"value":"on"}'
done
