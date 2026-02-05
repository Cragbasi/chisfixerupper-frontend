import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BeforeAfterCard = ({ item, index }) => {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="overflow-hidden border border-border/40 hover:shadow-xl transition-all duration-300"
        data-testid={`gallery-card-${index}`}
      >
        <CardContent className="p-0">
          {/* Before/After Comparison */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* After Image (Background) */}
            <img
              src={item.after_image}
              alt={`${item.title} - After`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Before Image (Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderValue[0]}%` }}
            >
              <img
                src={item.before_image}
                alt={`${item.title} - Before`}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: `${100 / (sliderValue[0] / 100)}%`, maxWidth: 'none' }}
              />
            </div>
            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
              style={{ left: `${sliderValue[0]}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-primary" />
              </div>
            </div>
            {/* Labels */}
            <div className="absolute top-4 left-4 z-20">
              <Badge className="bg-secondary text-secondary-foreground">Before</Badge>
            </div>
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-accent text-accent-foreground">After</Badge>
            </div>
          </div>
          
          {/* Slider Control */}
          <div className="px-6 py-3 bg-muted/30">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              min={5}
              max={95}
              step={1}
              className="w-full"
              data-testid={`gallery-slider-${index}`}
            />
          </div>

          {/* Info */}
          <div className="p-6">
            <Badge variant="outline" className="mb-3 text-xs">
              {item.service_type}
            </Badge>
            <h3 className="font-bitter font-bold text-lg text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        // First clear existing gallery data
        await axios.delete(`${API}/gallery`);
        // First seed the data
        await axios.post(`${API}/seed`);

        // Then fetch gallery items
        const response = await axios.get(`${API}/gallery`);
        setGalleryItems(response.data);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Fallback data
        setGalleryItems([
             {
            id: '1',
            title: 'Toilet Replacement & Tiling',
            description: 'Complete toilet replacement with new tiling and fixtures',
            service_type: 'Plumbing',
            before_image: "/assets/toiletBefore.PNG",
            after_image:  "/assets/toiletAfter.PNG",
          },
       
                 {
            id: '2',
            title: 'Roof Replacement & Landscaping',
            description: 'Complete roof replacement with high-quality materials and landscaping cleanup',
            service_type: 'Fixer Upper',
            before_image: "/assets/houseBefore.jpg",
            after_image:  "/assets/houseAfter.jpg",
          },
                
     
            {
            id: '3',
            title: 'Window and Door Replacement',
            description: 'Energy-efficient window and door installation',
            service_type: 'Windows and Doors',
            before_image: "/assets/windowBefore.jpg",
            after_image:  "/assets/windowAfter.jpeg",
          },
                 {
            id: '4',
            title: 'Roof Repair & Maintenance',
            description: 'Roof leak repair and preventive maintenance services',
            service_type: 'Roof Repair',
            before_image: "/assets/ventBefore.jpg",
            after_image:  "/assets/ventAfter2.jpg",
          },
                 {
            id: '5',
            title: 'Pipe Repair & Overhaul',
            description: 'Pipe leak repair and fixture replacement',
            service_type: 'Plumbing',
             before_image: "/assets/pipeBefore.jpg",
            after_image: "/assets/pipeAfter.jpg",
             },
                {
            id: '6',
            title: 'Kitchen Cabinet Refinishing',
            description: 'Complete cabinet refinishing with new hardware installation',
            service_type: 'Cabinets',
           before_image: 'https://plus.unsplash.com/premium_photo-1733342541690-01c34a234951?q=80&w=1568&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            after_image: 'https://images.unsplash.com/photo-1719569019031-ca8fb2911e2d?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         
          },
          {
            id: '7',
            title: 'Bathroom Remodeling',
            description: 'Complete bathroom remodeling with new fixtures and tiles',
            service_type: 'Plumbing',
            before_image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800',
            after_image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800',
          },
         
          {
            id: '8',
            title: 'Hardwood Floor Restoration',
            description: 'Sanding, staining, and finishing of hardwood floors',
            service_type: 'Flooring',
            before_image: 'https://images.unsplash.com/photo-1764150506842-4bbea42a9693?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            after_image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800',
          },
           
               {
            id: '9',
            title: 'Interior Wall Repair & Paint',
            description: 'Drywall repair and fresh coat of premium paint',
            service_type: 'Painting',
            before_image: 'https://plus.unsplash.com/premium_photo-1729005325786-d9d6ff6d0438?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            after_image: '/assets/wallAfter.jpg',
          },
       
        
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section 
      id="gallery" 
      className="py-24 bg-muted/30"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-bitter font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4"
            data-testid="gallery-title"
          >
            See the Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to see the before and after of my recent projects. 
            Quality work that speaks for itself.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item, index) => (
              <BeforeAfterCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
