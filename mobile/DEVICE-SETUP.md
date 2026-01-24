# 📱 Universal Device Setup Guide

## ✅ Works on ALL Devices Now!

The app is now configured to work automatically on:
- ✅ Physical Android phones
- ✅ Physical iOS/iPhone devices
- ✅ Android Emulator
- ✅ iOS Simulator
- ✅ Expo Go app
- ✅ Development builds

## 🚀 How to Run

### 1. Start Backend (Java Spring Boot)
```bash
# From the backend folder or click "Run" on ProductReviewApplication.java
cd backend
./mvnw spring-boot:run
```
Backend will be available at: `http://0.0.0.0:8080`

### 2. Start Mobile App
```bash
cd mobile
npm start
# or
npx expo start
```

### 3. Connect Your Device

#### For Physical Android Phone:
1. Make sure your phone and computer are on the **same WiFi network**
2. Scan the QR code with Expo Go app
3. The app will automatically detect the correct IP address

#### For Physical iPhone:
1. Make sure your phone and computer are on the **same WiFi network**
2. Scan the QR code with Camera app
3. Open in Expo Go
4. The app will automatically detect the correct IP address

#### For Emulators/Simulators:
- Just press 'a' (Android) or 'i' (iOS) in the Expo terminal
- Everything works automatically!

## 🔧 How It Works

The app uses **automatic IP detection**:
- On physical devices: Uses your computer's local network IP (detected via Expo)
- On Android emulator: Uses `10.0.2.2` (special alias for host machine)
- On iOS simulator: Uses `localhost`

No more hardcoded IPs or tunnel URLs! 🎉

## 🐛 Troubleshooting

### If you see "Network Error" or "503 Tunnel Unavailable":

1. **Check same WiFi**: Make sure phone and computer are on same network
2. **Restart Expo**: Stop and restart `npm start`
3. **Restart Backend**: Restart the Spring Boot application
4. **Check logs**: Look at the console for the detected IP:
   ```
   🔗 API Base URL: http://192.168.x.x:8080/api
   📱 Platform: ios
   🔧 Dev Mode: true
   ```

### If backend is not accessible:

1. Check that backend is running on `0.0.0.0:8080` (not just localhost)
2. Verify firewall isn't blocking port 8080
3. On Mac, go to System Preferences → Firewall → Allow Java

### To manually check your IP:
```bash
# On Mac/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# On Windows
ipconfig | findstr IPv4
```

## 📝 Technical Details

**Files modified for universal compatibility:**
- `src/services/api.js` - Auto-detects correct backend URL
- `app.json` - iOS/Android HTTP permissions
- `network_security_config.xml` - Android cleartext traffic
- `backend/application.properties` - Server listens on all interfaces
- `backend/SecurityConfiguration.java` - CORS allows all origins (dev mode)

## 🌐 Network Requirements

- **Same WiFi Network**: Your phone and computer must be on the same WiFi
- **No VPN**: Disable VPN on both devices (can interfere)
- **Firewall**: Make sure port 8080 is not blocked

## 🎯 Production Note

For production builds, update the `getBaseUrl()` function in `api.js` to point to your production server URL.
