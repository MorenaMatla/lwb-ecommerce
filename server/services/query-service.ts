import natural from 'natural';
import { InsertQuery } from '@shared/schema';

interface QueryData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AutomatedResponse {
  query: string;
  response: string;
}

export function setupQueryService() {
  // Sample database of previous queries and responses
  const queryResponses: AutomatedResponse[] = [
    {
      query: "Do you offer data secure erasure for hard drives?",
      response: "Yes, we offer secure data erasure services for all types of hard drives. Our process complies with industry standards and provides a certificate of erasure."
    },
    {
      query: "What are your rates for recycling laptops?",
      response: "Our laptop recycling rates depend on the quantity and condition. For bulk orders (50+), we offer special discounts. Standard recycling starts at M50 per unit. Please contact our sales team for a detailed quote."
    },
    {
      query: "How do you handle environmentally hazardous materials?",
      response: "We follow strict environmental protocols for handling hazardous materials. All components containing harmful substances are processed in our specialized facility that meets international environmental standards."
    },
    {
      query: "Can you recover data from damaged hard drives?",
      response: "Yes, we provide data recovery services for damaged hard drives. The success rate depends on the extent of damage. We offer free evaluation and only charge if we successfully recover your data."
    },
    {
      query: "Do you offer pickup services for e-waste?",
      response: "Yes, we offer pickup services for e-waste collection. For businesses within Lesotho, we provide free pickup for orders above M5000. For smaller orders or locations outside Lesotho, a nominal fee applies."
    }
  ];

  // Initialize Natural language processing tools
  const tokenizer = new natural.WordTokenizer();
  const stemmer = natural.PorterStemmer;

  // Process and tokenize a string
  const processText = (text: string): string[] => {
    const tokens = tokenizer.tokenize(text.toLowerCase()) || [];
    return tokens.map(token => stemmer.stem(token));
  };

  // Calculate similarity between two texts using Jaccard similarity
  const calculateSimilarity = (text1: string, text2: string): number => {
    const tokens1 = new Set(processText(text1));
    const tokens2 = new Set(processText(text2));
    
    // Intersection
    const intersection = new Set([...tokens1].filter(x => tokens2.has(x)));
    
    // Union
    const union = new Set([...tokens1, ...tokens2]);
    
    // Jaccard similarity coefficient
    return intersection.size / union.size;
  };

  // Find the best matching response for a query
  const findBestResponse = (queryText: string): string | null => {
    const SIMILARITY_THRESHOLD = 0.3; // Minimum similarity score to consider a match
    
    let bestMatch = null;
    let bestScore = 0;
    
    for (const pair of queryResponses) {
      const similarity = calculateSimilarity(queryText, pair.query);
      
      if (similarity > bestScore) {
        bestScore = similarity;
        bestMatch = pair.response;
      }
    }
    
    return bestScore >= SIMILARITY_THRESHOLD ? bestMatch : null;
  };

  // Process a client query
  const processQuery = async (data: QueryData): Promise<InsertQuery> => {
    const { name, email, subject, message } = data;
    
    // Attempt to find an automated response
    const response = findBestResponse(message);
    
    if (response) {
      // If we have an automated response, mark it as such
      return {
        name,
        email,
        subject,
        message,
        status: "automated",
        response,
        autoRepliedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
    } else {
      // Otherwise, mark it as pending for human intervention
      return {
        name,
        email,
        subject,
        message,
        status: "pending",
        createdAt: new Date().toISOString()
      };
    }
  };

  return {
    processQuery
  };
}
