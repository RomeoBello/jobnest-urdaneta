This patch adds:
1) Company logo upload on /post (saved to Firebase Storage under logos/ and URL stored in job doc)
2) Logo display on the jobs grid
3) New jobs are saved with status='pending' (for future admin approval)

How to apply:
- Unzip into your Next.js project root (same level as the 'app' folder). Allow overwrite.
- Ensure your Firebase Storage rules allow authenticated uploads to 'logos/'.

Enjoy!