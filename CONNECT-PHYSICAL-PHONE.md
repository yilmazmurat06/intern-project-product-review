# 📱 Connect Physical Phone - Quick Guide

## ✅ Current Status
- Backend running on: `http://10.2.131.45:8080` ✅
- Expo running on: `exp://10.2.131.45:8081` ✅
- App will connect to: `http://10.2.131.45:8080/api` ✅

## 🔌 How to Connect Your Physical Phone

### For iPhone/iOS:
1. **Install Expo Go** from App Store (if not installed)
2. **Check WiFi**: Make sure iPhone is on **same WiFi** as your Mac
3. **Scan QR Code**:
   - Open **Camera app** on iPhone
   - Point at the QR code in your terminal
   - Tap the notification that appears
   - It will open in Expo Go

### For Android Phone:
1. **Install Expo Go** from Play Store (if not installed)
2. **Check WiFi**: Make sure Android is on **same WiFi** as your Mac
3. **Scan QR Code**:
   - Open **Expo Go** app
   - Tap "Scan QR Code"
   - Point at the QR code in your terminal

## 🔍 Verify Connection

After opening the app, check the Expo terminal for these logs:
```
LOG  🔗 API Base URL: http://10.2.131.45:8080/api
LOG  📱 Platform: ios  (or android)
LOG  🔧 Dev Mode: true
LOG  🌐 Debugger Host: 10.2.131.45:8081
LOG  Fetching products...
LOG  Products response: { ... }
```

If you see "Products response" with data, **it's working!** 🎉

## ❌ Troubleshooting

### "Cannot connect to Metro"
- ✅ Check: Phone and Mac on **same WiFi network**
- ✅ Check: No VPN active on either device
- ✅ Restart: Both Expo (`r` key) and app

### "Network request failed" or "503 error"
- ✅ Check backend is running: `lsof -i :8080`
- ✅ Restart backend if needed
- ✅ Check firewall: Allow Java to accept connections

### "Stuck on splash screen"
- ✅ Shake phone → "Reload"
- ✅ In terminal: Press `r` to reload

### Phone not finding Expo server
1. Make sure you're scanning the **correct QR code** (not the old one)
2. Look for `Metro waiting on exp://10.2.131.45:8081` in terminal
3. Try manually entering: `exp://10.2.131.45:8081` in Expo Go

## 🌐 Network Check

Your Mac's IP is: **10.2.131.45**

To verify it hasn't changed:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

If your Mac's IP changed (e.g., after reconnecting to WiFi):
1. Update `LOCAL_IP` in api.js with new IP
2. Or just restart Expo (it auto-detects)

## 🎯 Expected Behavior

When working correctly, you should see:
1. App loads with no errors
2. Products list appears
3. Can click products to see details
4. Can add reviews
5. Terminal shows API requests in real-time

## 📞 Mac Firewall Settings

If Mac firewall is blocking:
1. System Preferences → Security & Privacy → Firewall
2. Click "Firewall Options"
3. Find "Java" → Change to "Allow incoming connections"
4. Restart backend

## ✅ Quick Test

Test backend is accessible from your network:
```bash
# On Mac
curl http://10.2.131.45:8080/api/products

# Should return JSON with products
```

---

**Everything is configured correctly!** Just scan the QR code from your physical phone while connected to the same WiFi. 🚀
