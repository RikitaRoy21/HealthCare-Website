import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationHeader from '@/components/NavigationHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Phone, Clock, Heart, Droplet, Activity, AlertCircle, Info, Search } from 'lucide-react';
import MouseFollower from '@/components/MouseFollower';

// Sample labs data
const nearbyLabs = [
  {
    id: 1,
    name: "HealthFirst Laboratory",
    address: "123 Medical Avenue, Cityville",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 7AM-7PM, Sat: 8AM-2PM",
    distance: "0.8 miles away",
    services: ["Blood Tests", "Urine Analysis", "Radiology", "ECG"],
    rating: 4.7
  },
  {
    id: 2,
    name: "PrecisionDiagnostics Center",
    address: "456 Health Street, Cityville",
    phone: "(555) 987-6543",
    hours: "Mon-Sat: 8AM-8PM, Sun: 9AM-1PM",
    distance: "1.2 miles away",
    services: ["Blood Tests", "Allergy Testing", "Immunology", "Molecular Testing"],
    rating: 4.9
  },
  {
    id: 3,
    name: "Quick Results Lab",
    address: "789 Wellness Road, Cityville",
    phone: "(555) 234-5678",
    hours: "24/7 Service",
    distance: "1.5 miles away",
    services: ["Emergency Testing", "Home Collection", "Digital Reports", "Express Results"],
    rating: 4.5
  },
  {
    id: 4,
    name: "CityLife Diagnostics",
    address: "321 Care Boulevard, Cityville",
    phone: "(555) 876-5432",
    hours: "Mon-Fri: 7AM-9PM, Sat-Sun: 8AM-6PM",
    distance: "2.3 miles away",
    services: ["Full Body Checkup", "Cancer Screening", "Genetic Testing", "Preventive Packages"],
    rating: 4.8
  }
];

// Health tips data
const healthTips = {
  "High Blood Pressure": [
    "Reduce sodium intake to less than 1,500mg daily",
    "Exercise regularly, aim for 30 minutes most days",
    "Maintain a healthy weight and BMI",
    "Limit alcohol consumption and avoid smoking",
    "Practice stress management techniques like meditation",
    "Take medications as prescribed by your doctor"
  ],
  "Low Blood Pressure": [
    "Stay hydrated by drinking plenty of water",
    "Consume more salt if approved by your doctor",
    "Eat smaller, low-carbohydrate meals",
    "Wear compression stockings if recommended",
    "Rise slowly from sitting or lying positions",
    "Avoid standing for long periods of time"
  ],
  "High Blood Sugar": [
    "Monitor blood glucose levels regularly",
    "Follow a balanced diet rich in fiber and low in simple carbs",
    "Stay physically active with regular exercise",
    "Take insulin or medication as prescribed",
    "Manage stress levels effectively",
    "Stay hydrated and get adequate sleep"
  ],
  "Low Blood Sugar": [
    "Consume 15-20 grams of fast-acting carbohydrates",
    "Carry glucose tablets or gel for emergencies",
    "Don't skip meals, especially if on medication",
    "Balance physical activity with proper food intake",
    "Check blood sugar before driving or operating machinery",
    "Have a bedtime snack if nighttime lows are an issue"
  ]
};

const PathoLab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userAddress, setUserAddress] = useState('123 Main St, Cityville, ST 12345');
  
  useEffect(() => {
    document.title = "Patho Care - HealthCare";
  }, []);
  
  const filteredLabs = nearbyLabs.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced colorful background with glossy effect and pathological image */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30">
        <img 
          src="https://images.unsplash.com/photo-1579165466741-7f35e4755183?auto=format&fit=crop&q=80&w=2070" 
          alt="Pathological lab" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 opacity-60 mix-blend-multiply bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.3),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIj48cGF0aCBkPSJNMzAgMzBtLTI4IDBhMjggMjggMCAxIDAgNTYgMCAyOCAyOCAwIDEgMC01NiAweiIgc3Ryb2tlPSIjOEI1Q0Y2IiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjQgMGEyNCAyNCAwIDEgMCA0OCAwIDI0IDI0IDAgMSAwLTQ4IDB6IiBzdHJva2U9IiM4QjVDRjYiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2Utb3BhY2l0eT0iMC4xIi8+PHBhdGggZD0iTTMwIDMwbS0yMCAwYTIwIDIwIDAgMSAwIDQwIDAgMjAgMjAgMCAxIDAtNDAgMHoiIHN0cm9rZT0iIzhCNUNGNiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
      </div>
      
      <MouseFollower />
      
      {/* Enhanced navigation header with better visibility */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-white/95 dark:bg-background/95 shadow-lg backdrop-blur-md border-b border-purple-200 dark:border-purple-900/30">
        <NavigationHeader />
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Patho Care Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find nearby pathological laboratories and get valuable health tips
          </p>
        </motion.div>
        
        <Tabs defaultValue="labs" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-purple-100/70 dark:bg-purple-900/30 p-1 rounded-xl shadow-md">
            <TabsTrigger value="labs" className="data-[state=active]:bg-white dark:data-[state=active]:bg-background/80 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 rounded-lg">Nearby Labs</TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-white dark:data-[state=active]:bg-background/80 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 rounded-lg">Health Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="labs" className="space-y-8">
            {/* User's current address with Google Maps API information */}
            <Card className="bg-white/80 dark:bg-background/80 backdrop-blur-sm border border-purple-100 dark:border-purple-900/50 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-xl text-purple-700 dark:text-purple-400">
                  <MapPin className="mr-2 h-5 w-5" />
                  Your Location
                </CardTitle>
                <CardDescription>
                  Enter your address to find nearby pathological laboratories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      value={userAddress} 
                      onChange={(e) => setUserAddress(e.target.value)}
                      className="pl-10 border-purple-200 dark:border-purple-800 focus-visible:ring-purple-500"
                      placeholder="Enter your full address"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                    Find Labs
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Powered by Google Maps API • Results are displayed based on your location
                </p>
              </CardContent>
            </Card>
            
            {/* Search labs with enhanced styling */}
            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search labs by name, location, or service..."
                  className="pl-10 border-purple-200 dark:border-purple-800 focus-visible:ring-purple-500 shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Labs list with enhanced cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLabs.map((lab) => (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-background/90 backdrop-blur-sm border border-purple-100 dark:border-purple-900/50">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-purple-700 dark:text-purple-400">{lab.name}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <MapPin className="mr-1 h-4 w-4 text-purple-500" />
                            {lab.address}
                          </CardDescription>
                        </div>
                        <div className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 rounded-full text-purple-700 dark:text-purple-400 text-sm font-semibold">
                          {lab.distance}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                          <span>{lab.phone}</span>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-purple-500" />
                          <span>{lab.hours}</span>
                        </div>
                        <div className="pt-2">
                          <p className="text-sm font-semibold mb-2">Available Services:</p>
                          <div className="flex flex-wrap gap-2">
                            {lab.services.map((service, idx) => (
                              <span 
                                key={idx} 
                                className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 rounded-md text-xs text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800/50"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t border-purple-100 dark:border-purple-900/50 pt-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="font-semibold">{lab.rating}</span>
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all">
                        Book Appointment
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {filteredLabs.length === 0 && (
              <div className="text-center p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-purple-100 dark:border-purple-800/30 shadow-md">
                <p className="text-lg font-medium text-purple-700 dark:text-purple-400">No laboratories found matching "{searchTerm}"</p>
                <p className="text-muted-foreground mt-2">Try a different search term or update your location</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tips" className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-white/90 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-red-600 dark:text-red-400">
                    <Heart className="mr-2 h-5 w-5" />
                    High Blood Pressure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {healthTips["High Blood Pressure"].map((tip, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-red-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-white/90 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-blue-600 dark:text-blue-400">
                    <Droplet className="mr-2 h-5 w-5" />
                    Low Blood Pressure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {healthTips["Low Blood Pressure"].map((tip, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-2 border-white/90 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-yellow-600 dark:text-yellow-400">
                    <Activity className="mr-2 h-5 w-5" />
                    High Blood Sugar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {healthTips["High Blood Sugar"].map((tip, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-yellow-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-white/90 dark:border-white/10 shadow-lg hover:shadow-xl transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-green-600 dark:text-green-400">
                    <Activity className="mr-2 h-5 w-5" />
                    Low Blood Sugar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {healthTips["Low Blood Sugar"].map((tip, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <Info className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PathoLab;
