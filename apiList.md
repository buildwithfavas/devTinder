# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST / logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password     // Forgot password API

## connectionRequestRouter
- POST /request/send/:status/:userId  =>status can be interested or ignored
- POST /request/review/:status/:requestId  =>status can be interested or ignored

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform

- Status: ignore, interested, accepeted, rejected