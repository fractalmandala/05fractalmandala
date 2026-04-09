---
title: payments api
tags:
  - notes
group: internal
---

```javascript
import type { RequestHandler } from '@sveltejs/kit';

const key_id = 'rzp_test_kE2mKIAOy22NF9';
const key_secret = '3r1hETWVrl5LDDZN5hBJnXf8';

export const POST: RequestHandler = async () => {
  const url = 'https://api.razorpay.com/v1/subscriptions';

  const body = {
    plan_id: "plan_OT47oMs6jeUT6k",
    customer_notify: 1,
    quantity: 1,
    total_count: 24,
    notify_info: {
      notify_phone: +919643307785,
      notify_email: "amrit.pandey@brhat.in"
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${key_id}:${key_secret}`).toString('base64')
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Failed to create subscription: ${response.statusText}`);
    }

    const subscription = await response.json();
    return new Response(JSON.stringify(subscription), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
```