# <u>Project design</u>

## <u>Database entities</u>

### 1. <u>User</u>

_Fields_ :

1. Id
2. Name
3. Email
4. Password
5. Role (Normal_User/User_Manager/Admin)

### 2. <u>Trip</u>

_Fields_ :

1. Id
2. Destination
3. Start_Date
4. End_Date
5. Comment

## <u>Views</u>

1. SignUp view
2. Login view
3. Normal_User view
   - logged in view
   - create trip view
   - single trip edit/delete view
4. User_Manager view
   - logged in view
   - create user view
   - single user edit/delete view
5. Admin view
   - logged in view
   - create trip view
   - create user view
   - single trip edit/delete view
   - single user edit/delete view
