import { NextRequest, NextResponse } from 'next/server';

interface ScoringRequest {
  name: string;
  email: string;
  ip_address: string;
  phone_number: string;
}

// Mock in-memory storage for trained model data
const trainedModels = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, modelId } = body as { user: ScoringRequest; modelId?: string };

    if (!user || !user.name || !user.email) {
      return NextResponse.json(
        { error: 'Missing required user fields' },
        { status: 400 }
      );
    }

    // In a real app, you'd retrieve the trained model from a database
    // For now, we'll generate a score based on the user data
    const riskScore = calculateRiskScore(user);

    return NextResponse.json({
      name: user.name,
      email: user.email,
      ip: user.ip_address,
      phone: user.phone_number,
      riskScore,
      flagged: riskScore >= 70,
      recommendation:
        riskScore >= 70
          ? 'Block or require additional verification'
          : riskScore >= 40
            ? 'Monitor closely'
            : 'Allow',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error scoring user:', error);
    return NextResponse.json(
      { error: 'Failed to score user' },
      { status: 500 }
    );
  }
}

function calculateRiskScore(user: ScoringRequest): number {
  let score = 0;

  // Suspicious patterns
  if (user.ip_address && user.ip_address.includes('0.0.0')) {
    score += 20;
  }

  if (user.phone_number === 'N/A' || user.phone_number === '') {
    score += 15;
  }

  if (user.email.includes('+')) {
    score += 10;
  }

  // Random behavior injection for demo
  score += Math.random() * 30;

  return Math.min(100, Math.round(score));
}
