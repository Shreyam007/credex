export interface ToolPlan {
  planName: string;
  monthlyPricePerSeat: number;
  annualPricePerSeat: number;
  minSeats: number;
  features: string[];
  useCaseFit: string[];
}

export interface ToolPricing {
  toolId: string;
  toolName: string;
  plans: Record<string, ToolPlan>;
}

export const PRICING_DATA: Record<string, ToolPricing> = {
  cursor: {
    toolId: 'cursor',
    toolName: 'Cursor',
    plans: {
      hobby: {
        planName: 'Hobby',
        monthlyPricePerSeat: 0,
        annualPricePerSeat: 0,
        minSeats: 1,
        features: ['Basic AI completions', '2000 completions/mo'],
        useCaseFit: ['coding'],
      },
      pro: {
        planName: 'Pro',
        monthlyPricePerSeat: 20,
        annualPricePerSeat: 20,
        minSeats: 1,
        features: ['Unlimited completions', 'Advanced models', '500 fast requests/mo'],
        useCaseFit: ['coding'],
      },
      business: {
        planName: 'Business',
        monthlyPricePerSeat: 40,
        annualPricePerSeat: 40,
        minSeats: 1,
        features: ['Admin dashboard', 'SAML SSO', 'Centralized billing'],
        useCaseFit: ['coding'],
      },
      enterprise: {
        planName: 'Enterprise',
        monthlyPricePerSeat: 60,
        annualPricePerSeat: 60,
        minSeats: 1,
        features: ['Custom contracts', 'Dedicated support', 'Security reviews'],
        useCaseFit: ['coding'],
      },
    },
  },
  github_copilot: {
    toolId: 'github_copilot',
    toolName: 'GitHub Copilot',
    plans: {
      individual: {
        planName: 'Individual',
        monthlyPricePerSeat: 10,
        annualPricePerSeat: 8.33,
        minSeats: 1,
        features: ['Standard AI coding assistance', 'Chat in IDE'],
        useCaseFit: ['coding'],
      },
      business: {
        planName: 'Business',
        monthlyPricePerSeat: 19,
        annualPricePerSeat: 19,
        minSeats: 1,
        features: ['Policy management', 'Proxy support', 'Vulnerability filtering'],
        useCaseFit: ['coding'],
      },
      enterprise: {
        planName: 'Enterprise',
        monthlyPricePerSeat: 39,
        annualPricePerSeat: 39,
        minSeats: 1,
        features: ['Customized models', 'Fine-tuning (preview)', 'Organization wide insights'],
        useCaseFit: ['coding'],
      },
    },
  },
  claude: {
    toolId: 'claude',
    toolName: 'Claude (Anthropic)',
    plans: {
      free: {
        planName: 'Free',
        monthlyPricePerSeat: 0,
        annualPricePerSeat: 0,
        minSeats: 1,
        features: ['Standard Claude experience', 'Daily usage limits'],
        useCaseFit: ['writing', 'research', 'data'],
      },
      pro: {
        planName: 'Pro',
        monthlyPricePerSeat: 20,
        annualPricePerSeat: 20,
        minSeats: 1,
        features: ['5x usage vs Free', 'Early access to features', 'Project workspaces'],
        useCaseFit: ['writing', 'research', 'data'],
      },
      team: {
        planName: 'Team',
        monthlyPricePerSeat: 30,
        annualPricePerSeat: 30,
        minSeats: 5,
        features: ['Higher usage limits', 'Admin tools', 'Shared workspaces'],
        useCaseFit: ['writing', 'research', 'data'],
      },
      max: {
        planName: 'Max',
        monthlyPricePerSeat: 100,
        annualPricePerSeat: 100,
        minSeats: 1,
        features: ['Priority access', 'Highest usage limits'],
        useCaseFit: ['writing', 'research', 'data'],
      },
    },
  },
  chatgpt: {
    toolId: 'chatgpt',
    toolName: 'ChatGPT (OpenAI)',
    plans: {
      plus: {
        planName: 'Plus',
        monthlyPricePerSeat: 20,
        annualPricePerSeat: 20,
        minSeats: 1,
        features: ['Access to GPT-4', 'DALL-E', 'Data analysis'],
        useCaseFit: ['writing', 'research', 'data'],
      },
      team: {
        planName: 'Team',
        monthlyPricePerSeat: 30,
        annualPricePerSeat: 25,
        minSeats: 2,
        features: ['Higher message caps', 'Workspace management', 'No data training'],
        useCaseFit: ['writing', 'research', 'data'],
      },
    },
  },
  anthropic_api: {
    toolId: 'anthropic_api',
    toolName: 'Anthropic API',
    plans: {
      pay_as_you_go: {
        planName: 'Pay-as-you-go',
        monthlyPricePerSeat: 0, // variable
        annualPricePerSeat: 0,
        minSeats: 1,
        features: ['Claude 3.5 Sonnet: $3/1M in, $15/1M out', 'Claude 3 Haiku: $0.25/1M in, $1.25/1M out'],
        useCaseFit: ['coding', 'writing', 'data', 'research'],
      },
    },
  },
  openai_api: {
    toolId: 'openai_api',
    toolName: 'OpenAI API',
    plans: {
      pay_as_you_go: {
        planName: 'Pay-as-you-go',
        monthlyPricePerSeat: 0, // variable
        annualPricePerSeat: 0,
        minSeats: 1,
        features: ['GPT-4o: $5/1M in, $15/1M out', 'GPT-4o-mini: $0.15/1M in, $0.6/1M out'],
        useCaseFit: ['coding', 'writing', 'data', 'research'],
      },
    },
  },
  gemini: {
    toolId: 'gemini',
    toolName: 'Gemini (Google)',
    plans: {
      advanced: {
        planName: 'Gemini Advanced',
        monthlyPricePerSeat: 19.99,
        annualPricePerSeat: 19.99,
        minSeats: 1,
        features: ['Ultra 1.0/1.5', '2TB Storage', 'Integrations with Google Workspace'],
        useCaseFit: ['writing', 'research', 'data'],
      },
      api: {
        planName: 'API',
        monthlyPricePerSeat: 0,
        annualPricePerSeat: 0,
        minSeats: 1,
        features: ['Gemini 1.5 Pro: $3.5/1M in, $10.5/1M out', 'Gemini 1.5 Flash: $0.075/1M in, $0.3/1M out'],
        useCaseFit: ['coding', 'writing', 'data', 'research'],
      },
    },
  },
  windsurf: {
    toolId: 'windsurf',
    toolName: 'Windsurf',
    plans: {
      free: {
        planName: 'Free',
        monthlyPricePerSeat: 0,
        annualPricePerSeat: 0,
        minSeats: 1,
        features: ['Basic IDE features', 'Limited AI'],
        useCaseFit: ['coding'],
      },
      pro: {
        planName: 'Pro',
        monthlyPricePerSeat: 15,
        annualPricePerSeat: 15,
        minSeats: 1,
        features: ['Advanced AI features', 'Unlimited completions'],
        useCaseFit: ['coding'],
      },
      teams: {
        planName: 'Teams',
        monthlyPricePerSeat: 35,
        annualPricePerSeat: 35,
        minSeats: 1,
        features: ['Team collaboration', 'Centralized management'],
        useCaseFit: ['coding'],
      },
    },
  },
};
