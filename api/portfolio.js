/**
 * Portfolio Data API Handler
 * Handles saving and retrieving portfolio data
 */

export default async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST' || req.method === 'PUT') {
      // Save portfolio data
      const portfolioData = req.body;

      if (!portfolioData || typeof portfolioData !== 'object') {
        return res.status(400).json({ error: 'Invalid portfolio data' });
      }

      // Validate required fields
      if (!portfolioData.date || !Array.isArray(portfolioData.allocations)) {
        return res.status(400).json({
          error: 'Portfolio data must include date and allocations array',
        });
      }

      // Log the save (in production, you'd save to a database or file)
      console.log('Portfolio saved:', {
        date: portfolioData.date,
        timestamp: new Date().toISOString(),
        allocations: portfolioData.allocations.length,
        securities: portfolioData.securities?.length || 0,
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Portfolio data saved successfully',
        data: {
          date: portfolioData.date,
          timestamp: new Date().toISOString(),
        },
      });
    }

    if (req.method === 'GET') {
      // Retrieve portfolio data
      // In production, you would fetch from database/file
      return res.status(200).json({
        success: true,
        message: 'Portfolio data retrieved',
      });
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Portfolio API error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
