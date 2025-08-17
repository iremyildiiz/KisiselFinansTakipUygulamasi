import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 25, 
    backgroundColor: '#f0f5f1', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b6d3fff', 
    textAlign: 'center',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#7fb77e',
    backgroundColor: '#e6f0e8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#2f4f2f',
  },
  error: { 
    color: '#b00020', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  button: {
    backgroundColor: '#3b6d3fff', 
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotLink: { 
    marginTop: 12, 
    alignItems: 'center' 
  },
  forgotText: { 
    color: '#3b6d3fff', 
    textDecorationLine: 'underline', 
    fontSize: 14 
  },
  registerLink: { 
    marginTop: 18, 
    alignItems: 'center' 
  },
  registerText: { 
    color: '#2a7f4fff', 
    textDecorationLine: 'underline', 
    fontSize: 14 
  },
});
