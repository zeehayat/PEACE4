<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustCloudflareProxies extends Middleware
{
    // Trust all proxies — safe when you only accept traffic via Cloudflare.
    protected $proxies = '*';

    // Honor the standard forwarded headers (Cloudflare sets these).
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR   |
        Request::HEADER_X_FORWARDED_HOST  |
        Request::HEADER_X_FORWARDED_PORT  |
        Request::HEADER_X_FORWARDED_PROTO;
}
