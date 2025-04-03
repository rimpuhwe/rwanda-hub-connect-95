
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { services } from '@/data/mockServices';

// This is a mock function that simulates an API call
// In a real app, you would use axios to fetch data from your API
const fetchServices = async (filters: any = {}) => {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter services based on filters
  let filteredServices = [...services];
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredServices = filteredServices.filter(service => 
      service.name.toLowerCase().includes(searchTerm) || 
      service.description.toLowerCase().includes(searchTerm) ||
      service.location.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.type) {
    filteredServices = filteredServices.filter(service => 
      service.type === filters.type
    );
  }
  
  if (filters.location) {
    filteredServices = filteredServices.filter(service => 
      service.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }
  
  return filteredServices;
};

export const useServices = (filters: any = {}) => {
  return useQuery({
    queryKey: ['services', filters],
    queryFn: () => fetchServices(filters),
  });
};

export const useServiceById = (id: string) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      // In a real app, this would be an API call
      const service = services.find(service => service.id === id);
      if (!service) {
        throw new Error('Service not found');
      }
      return service;
    },
    enabled: !!id,
  });
};
