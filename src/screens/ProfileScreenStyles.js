// ProfileScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 8,
    zIndex: 10,
  },
  profileBox: {
    width: '90%',
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 40,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width:0, height:3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  darkProfileBox: {
    backgroundColor: '#222',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 18,
    borderWidth: 3,
    borderColor: '#5E936C',
  },
  placeholderImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#5E936C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  darkPlaceholder: {
    backgroundColor: '#3a6d4b',
  },
  initialsText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '700',
  },
  nameText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#333',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
  },
  darkText: {
    color: '#eee',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width:0, height:4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 7,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  tertiaryButton: {
    backgroundColor: '#e0e0e0',
  },
  logoutButton: {
    backgroundColor: '#e53935',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  buttonTextSecondary: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextTertiary: {
    color: '#555',
    fontWeight: '600',
    fontSize: 16,
  },
  versionText: {
    marginTop: 20,
    fontSize: 14,
    color: '#999',
  },
});
