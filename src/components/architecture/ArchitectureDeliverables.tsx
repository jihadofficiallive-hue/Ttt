import React, { useState } from 'react';
import {
  Database,
  Layers,
  Code2,
  Copy,
  Check,
  Smartphone,
  Server,
  Shield,
  Tv,
  CheckCircle2,
  Share2,
  KeyRound
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ArchitectureDeliverables: React.FC = () => {
  const { showToast } = useApp();
  const [activeStep, setActiveStep] = useState<'step1' | 'step2' | 'step3'>('step1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const sqlSchemaCode = `-- ==============================================================================
-- OTT PLAY - POSTGRESQL PRODUCTION DATABASE SCHEMA
-- Parent Entity: JS Private Limited (JSPL)
-- Target: Scalable Relational / CockroachDB / PostgreSQL 16+
-- ==============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    avatar_url TEXT,
    auth_provider VARCHAR(50) DEFAULT 'google' CHECK (auth_provider IN ('google', 'email', 'apple')),
    google_sub_id VARCHAR(255) UNIQUE,
    subscription_tier VARCHAR(50) DEFAULT 'FREE' CHECK (subscription_tier IN ('FREE', 'VIP', 'PREMIUM_4K')),
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    auto_play_next BOOLEAN DEFAULT TRUE,
    default_stream_quality VARCHAR(20) DEFAULT 'AUTO',
    parental_pin_hash VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_google_sub ON users(google_sub_id);

-- 2. ADMIN ACCOUNTS TABLE (Restricted Securitized Console)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- bcrypt (default initial: jspl / 6623)
    role VARCHAR(50) DEFAULT 'SUPER_ADMIN' CHECK (role IN ('SUPER_ADMIN', 'CONTENT_MANAGER', 'OPS_ENGINEER')),
    two_factor_secret VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_ip VARCHAR(45),
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. MOVIES & WEB SERIES CATALOG
CREATE TABLE IF NOT EXISTS media_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('movie', 'series')),
    synopsis TEXT NOT NULL,
    release_year INT NOT NULL,
    content_rating VARCHAR(20) DEFAULT 'U/A 16+', -- U, U/A 13+, U/A 16+, A/R, TV-MA
    imdb_score NUMERIC(3, 1) DEFAULT 8.0,
    duration_minutes INT, -- for movies
    seasons_count INT DEFAULT 1, -- for series
    poster_url TEXT NOT NULL,
    backdrop_url TEXT NOT NULL,
    hls_manifest_url TEXT NOT NULL, -- Master .m3u8 CDN URL
    drm_key_id VARCHAR(100),
    is_trending BOOLEAN DEFAULT FALSE,
    is_top10 BOOLEAN DEFAULT FALSE,
    top10_rank INT CHECK (top10_rank BETWEEN 1 AND 10),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_type_year ON media_items(content_type, release_year DESC);
CREATE INDEX idx_media_top10 ON media_items(is_top10, top10_rank) WHERE is_top10 = TRUE;

-- 4. GENRES & MAPPINGS
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS media_genres (
    media_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (media_id, genre_id)
);

-- 5. LIVE TV CHANNELS (24/7 Linear EPG)
CREATE TABLE IF NOT EXISTS live_channels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('Sports', 'News', 'Entertainment', 'Movies', 'Kids', 'Music')),
    channel_number INT UNIQUE,
    logo_url TEXT NOT NULL,
    stream_url TEXT NOT NULL, -- HLS / LL-HLS / DASH stream
    resolution VARCHAR(30) DEFAULT '1080p 60fps',
    is_active BOOLEAN DEFAULT TRUE,
    low_latency_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. LIVE EPG SCHEDULE
CREATE TABLE IF NOT EXISTS epg_programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID REFERENCES live_channels(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_epg_schedule ON epg_programs(channel_id, start_time, end_time);

-- 7. WATCH HISTORY (Continue Watching)
CREATE TABLE IF NOT EXISTS watch_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    progress_seconds INT NOT NULL DEFAULT 0,
    total_seconds INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, media_id)
);

-- 8. WATCHLIST / BOOKMARKS
CREATE TABLE IF NOT EXISTS user_watchlist (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    media_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, media_id)
);`;

  const reactNativeAuthCode = `// ==============================================================================
// OTT PLAY - REACT NATIVE GOOGLE AUTH & REST API SERVICE
// Target: React Native 0.74+ / Expo / Cross-Platform Mobile
// ==============================================================================

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Google Sign-In SDK with Web Client ID from Google Cloud Console
GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  offlineAccess: true,
  scopes: ['profile', 'email'],
});

interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkCachedUser();
  }, []);

  const checkCachedUser = async () => {
    try {
      const stored = await AsyncStorage.getItem('@ottplay_session');
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      console.warn('Session restore error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      // Exchange Google ID Token with JSPL Backend Auth Gateway
      const serverRes = await fetch('https://api.ottplay.jspl.com/v1/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = await serverRes.json();
      if (!serverRes.ok) throw new Error(data.message || 'Google Auth verification failed');

      setUser(data.user);
      await AsyncStorage.setItem('@ottplay_session', JSON.stringify(data.user));
      await AsyncStorage.setItem('@ottplay_jwt', data.accessToken);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled Google flow');
      } else {
        console.error('Google Sign-In Failure:', error);
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.multiRemove(['@ottplay_session', '@ottplay_jwt']);
      setUser(null);
    } catch (e) {
      console.error('SignOut error:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);`;

  const flutterAuthCode = `// ==============================================================================
// OTT PLAY - FLUTTER GOOGLE AUTHENTICATION & RIVERPOD REPOSITORY
// Target: Flutter 3.22+ / Dart 3 / Cross-Platform Android & iOS
// ==============================================================================

import 'package:flutter/foundation.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class UserModel {
  final String id;
  final String email;
  final String name;
  final String avatarUrl;
  final String planTier;

  UserModel({
    required this.id,
    required this.email,
    required this.name,
    required this.avatarUrl,
    required this.planTier,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      name: json['fullName'],
      avatarUrl: json['avatarUrl'] ?? '',
      planTier: json['subscriptionTier'] ?? 'FREE',
    );
  }
}

class AuthService {
  static final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: ['email', 'profile'],
  );
  static const _storage = FlutterSecureStorage();
  static const String _apiBase = 'https://api.ottplay.jspl.com/v1';

  /// One-Tap / Standard Google Sign In Flow
  static Future<UserModel?> signInWithGoogle() async {
    try {
      final GoogleSignInAccount? account = await _googleSignIn.signIn();
      if (account == null) return null; // User cancelled

      final GoogleSignInAuthentication auth = await account.authentication;
      final String? idToken = auth.idToken;

      if (idToken == null) throw Exception('Google Auth idToken is null');

      // Validate ID Token with JS Private Limited Secure Gateway
      final response = await http.post(
        Uri.parse('$_apiBase/auth/google'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'idToken': idToken}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await _storage.write(key: 'jwt_token', value: data['accessToken']);
        return UserModel.fromJson(data['user']);
      } else {
        throw Exception('Server rejected Google authentication');
      }
    } catch (e) {
      debugPrint('Flutter Google Auth Error: $e');
      rethrow;
    }
  }

  static Future<void> signOut() async {
    await _googleSignIn.signOut();
    await _storage.delete(key: 'jwt_token');
  }
}`;

  const nodeAdminAuthCode = `// ==============================================================================
// OTT PLAY - BACKEND NODE.JS EXPRESS ADMIN AUTH & RBAC CONTROLLER
// Target: Node.js 20+ / Express / TypeScript
// Credentials Spec: Initial Admin Username "jspl", Initial Password "6623"
// ==============================================================================

import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'jspl_ott_super_secure_2026';
const INITIAL_ADMIN_USER = 'jspl';
// In production seed script, "6623" is hashed with 12 salt rounds
const INITIAL_ADMIN_HASH = '$2b$12$Zq19pP.YdIe1kC9GgO2D2exsI6rC5M6wSgM0qG5yN2vN6.exampleHash';

// Rate Limiting: Prevent Brute Force Attacks on Admin Gateway
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5, // 5 attempts per IP
  message: { error: 'Too many authentication attempts. IP temporarily restricted by JSPL firewall.' },
});

// Admin Login Endpoint: POST /api/v1/admin/login
router.post('/login', adminLoginLimiter, async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  // Verification Logic (Hardcoded fallback for initial provisioning)
  const isHardcodedValid = username.toLowerCase() === 'jspl' && password === '6623';

  if (!isHardcodedValid) {
    // Optionally check database query: SELECT * FROM admin_users WHERE username = $1
    return res.status(401).json({ error: 'Invalid administrative credentials' });
  }

  // Issue Securitized Admin JWT
  const token = jwt.sign(
    {
      sub: 'admin-jspl-01',
      username: 'jspl',
      role: 'SUPER_ADMIN',
      entity: 'JS Private Limited',
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({
    status: 'authenticated',
    role: 'SUPER_ADMIN',
    accessToken: token,
    expiresIn: 28800,
    company: 'JS Private Limited',
  });
});

// RBAC Middleware for Securitized Admin Routes
export const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (decoded.role !== 'SUPER_ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Insufficient JSPL privileges' });
    }
    (req as any).adminUser = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired administrative token' });
  }
};

export default router;`;

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Title & Metadata Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#171B24] via-[#141720] to-[#171B24] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-red-600/20 text-red-400 font-mono text-xs font-bold uppercase tracking-wider border border-red-500/20">
                Enterprise Blueprint
              </span>
              <span className="text-xs text-slate-400">v2.4.0-Production Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              OTT Play Architecture & UI/UX Framework
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Engineered for <b>JS Private Limited</b>. Cross-platform mobile (Flutter / React Native),
              ultra-low latency Live TV, HLS multi-bitrate streaming, and securitized admin portal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-400" />
              <span>JSPL Approved</span>
            </span>
          </div>
        </div>

        {/* Step Selector Pills */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-white/5">
          <button
            onClick={() => setActiveStep('step1')}
            className={`py-3 px-3 rounded-xl border text-left transition-all ${
              activeStep === 'step1'
                ? 'bg-red-600/20 border-red-500/50 text-white shadow-lg shadow-red-950/40'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              <Database size={15} className={activeStep === 'step1' ? 'text-red-400' : 'text-slate-400'} />
              <span>Step 1: Database Schema</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block truncate">
              User, Movie, Channel, Admin ERD
            </p>
          </button>

          <button
            onClick={() => setActiveStep('step2')}
            className={`py-3 px-3 rounded-xl border text-left transition-all ${
              activeStep === 'step2'
                ? 'bg-red-600/20 border-red-500/50 text-white shadow-lg shadow-red-950/40'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              <Layers size={15} className={activeStep === 'step2' ? 'text-red-400' : 'text-slate-400'} />
              <span>Step 2: UI/UX Screen Flow</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block truncate">
              Screen-by-Screen Layout & Journeys
            </p>
          </button>

          <button
            onClick={() => setActiveStep('step3')}
            className={`py-3 px-3 rounded-xl border text-left transition-all ${
              activeStep === 'step3'
                ? 'bg-red-600/20 border-red-500/50 text-white shadow-lg shadow-red-950/40'
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              <Code2 size={15} className={activeStep === 'step3' ? 'text-red-400' : 'text-slate-400'} />
              <span>Step 3: Starter Boilerplate</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 hidden sm:block truncate">
              Google & Admin Auth Code
            </p>
          </button>
        </div>
      </div>

      {/* STEP 1: DATABASE SCHEMA */}
      {activeStep === 'step1' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Database size={20} className="text-red-500" />
                <span>Step 1: Production Relational Database Schema & Models</span>
              </h2>
              <p className="text-xs text-slate-400">
                PostgreSQL DDL with foreign key integrity, indexes, and ENUM constraints
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(sqlSchemaCode, 'sql')}
              className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
            >
              {copiedKey === 'sql' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>Copy SQL DDL</span>
            </button>
          </div>

          {/* High-Level Schema Architecture Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
              <div className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Table: users</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 font-mono">
                <li>• id (UUID PK)</li>
                <li>• email (VARCHAR UNIQUE)</li>
                <li>• full_name (VARCHAR)</li>
                <li>• google_sub_id (VARCHAR)</li>
                <li>• subscription_tier (ENUM)</li>
                <li>• auto_play_next (BOOLEAN)</li>
                <li>• parental_pin_hash (VARCHAR)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
              <div className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Table: media_items</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 font-mono">
                <li>• id (UUID PK)</li>
                <li>• slug, title, content_type</li>
                <li>• hls_manifest_url (TEXT)</li>
                <li>• poster_url, backdrop_url</li>
                <li>• is_trending, is_top10</li>
                <li>• top10_rank (1-10)</li>
                <li>• drm_key_id (VARCHAR)</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
              <div className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Table: live_channels</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 font-mono">
                <li>• id (UUID PK)</li>
                <li>• name, slug, channel_number</li>
                <li>• category (Sports, News...)</li>
                <li>• stream_url (HLS / LL-HLS)</li>
                <li>• resolution (1080p 60fps)</li>
                <li>• epg_programs (1-to-many)</li>
                <li>• low_latency_enabled</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#141720] border border-white/5">
              <div className="flex items-center gap-2 font-bold text-xs text-white mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Table: admin_users</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1 font-mono">
                <li>• id (UUID PK)</li>
                <li>• username: 'jspl'</li>
                <li>• password_hash: (6623)</li>
                <li>• role: 'SUPER_ADMIN'</li>
                <li>• two_factor_secret (VARCHAR)</li>
                <li>• last_login_ip, last_login_at</li>
                <li>• is_active (BOOLEAN)</li>
              </ul>
            </div>
          </div>

          {/* DDL Code Viewer */}
          <div className="rounded-xl border border-white/10 bg-[#0E1118] overflow-hidden">
            <div className="px-4 py-3 bg-[#151821] border-b border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">schema.sql (PostgreSQL 16 Engine)</span>
              <span className="text-[11px] text-slate-500">Includes Indexes & Cascading FKs</span>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto custom-scrollbar leading-relaxed">
              <code>{sqlSchemaCode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* STEP 2: SCREEN-BY-SCREEN UI/UX FLOW */}
      {activeStep === 'step2' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers size={20} className="text-red-500" />
              <span>Step 2: Screen-by-Screen UI/UX Layout Structure & Navigation State Machine</span>
            </h2>
            <p className="text-xs text-slate-400">
              Zero-pill discipline, 44px+ touch targets, glassmorphic headers, and smooth micro-interactions
            </p>
          </div>

          {/* Screen Breakdown Matrix */}
          <div className="space-y-4">
            {/* Screen 1: Home */}
            <div className="p-5 rounded-2xl bg-[#141720] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-bold font-mono">
                    01
                  </span>
                  <h3 className="text-sm font-bold text-white">Home Screen (Discovery Hub)</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Route: /home</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Primary landing viewport for on-demand engagement. Leads with a full-bleed 16:9 hero carousel banner featuring dynamic backdrop blur, auto-cycling trailers, sound toggle, and one-tap 'Watch Now' CTA.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-400 pt-2 border-t border-white/5">
                <div>
                  <b className="text-white block mb-0.5">Key Components:</b>
                  HeroCarousel, CategoryFilterBar, ContinueWatchingRow, Top10RankedRow, LiveTvPreviewSection.
                </div>
                <div>
                  <b className="text-white block mb-0.5">Interaction Triggers:</b>
                  Horizontal swipe gesture, card tap to open MovieDetailsModal, direct play button on thumbnail.
                </div>
                <div>
                  <b className="text-white block mb-0.5">Performance Optimizations:</b>
                  Media skeleton shimmers, lazy loaded webp posters, preloaded video stream manifest.
                </div>
              </div>
            </div>

            {/* Screen 2: Live TV */}
            <div className="p-5 rounded-2xl bg-[#141720] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-bold font-mono">
                    02
                  </span>
                  <h3 className="text-sm font-bold text-white">Live TV Screen (Linear Broadcast Guide)</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Route: /livetv</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ultra-responsive 24/7 channel directory with electronic program guide (EPG) timelines. Channels categorized by Sports, News, Entertainment, Kids, and Movies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-400 pt-2 border-t border-white/5">
                <div>
                  <b className="text-white block mb-0.5">Key Components:</b>
                  LiveChannelGrid, LiveIndicatorPulse, EPGTimelineBar, MiniChannelSwitcherDrawer.
                </div>
                <div>
                  <b className="text-white block mb-0.5">Interaction Triggers:</b>
                  Channel tile tap immediately opens low-latency player, category filter segmented buttons.
                </div>
                <div>
                  <b className="text-white block mb-0.5">Latency SLA:</b>
                  LL-HLS chunked transfer encoding (under 3.2s glass-to-glass delay).
                </div>
              </div>
            </div>

            {/* Screen 3: Details & Video Player */}
            <div className="p-5 rounded-2xl bg-[#141720] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-bold font-mono">
                    03
                  </span>
                  <h3 className="text-sm font-bold text-white">Movie / Details Screen & Custom Player</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Route: /title/:id</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cinematic sheet showcasing high-res title art, IMDb rating, unboxed typographic metadata, cast avatars, and 'More Like This' recommendations. Fullscreen custom player with 10s skip, quality switcher (4K UHD to 720p), multi-language audio/subtitles, and resume progress tracking.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-400 pt-2 border-t border-white/5">
                <div>
                  <b className="text-white block mb-0.5">Key Components:</b>
                  VideoPlayerModal, CustomSeekBar, AudioSubtitlePicker, SpeedSelector, RelatedMediaCarousel.
                </div>
                <div>
                  <b className="text-white block mb-0.5">Gestures:</b>
                  Double-tap to skip 10s forward/backward, swipe vertically for brightness/volume, pinch for zoom.
                </div>
                <div>
                  <b className="text-white block mb-0.5">State Persistence:</b>
                  Local + Cloud resume sync with millisecond timestamp storage.
                </div>
              </div>
            </div>

            {/* Screen 4: Search & Profile */}
            <div className="p-5 rounded-2xl bg-[#141720] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-bold font-mono">
                    04
                  </span>
                  <h3 className="text-sm font-bold text-white">Search, Watchlist, Offline & Profile Screen</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Route: /search, /profile</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant indexed search with facets (Genre, Language, Year, Content Type). Profile screen with Google Account integration, active plan badge (VIP/Premium 4K), offline download storage manager, streaming quality presets, and "Powered by JS Private Limited" enterprise credits.
              </p>
            </div>

            {/* Screen 5: Admin */}
            <div className="p-5 rounded-2xl bg-[#141720] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center text-xs font-bold font-mono">
                    05
                  </span>
                  <h3 className="text-sm font-bold text-white">Restricted Securitized Admin Portal</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Route: /admin (jspl / 6623)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gated by 256-bit authentication for JS Private Limited operations staff. Features live bandwidth graphs, stream concurrency telemetry, Movie & Live TV CRUD modals, subscriber status management, and CDN cache purge tools.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: STARTER BOILERPLATE CODE */}
      {activeStep === 'step3' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 size={20} className="text-red-500" />
                <span>Step 3: Starter Code / Boilerplate for Cross-Platform Apps</span>
              </h2>
              <p className="text-xs text-slate-400">
                Ready-to-use boilerplate for React Native, Flutter, and Node.js Express Admin API
              </p>
            </div>
          </div>

          {/* Code Tabs */}
          <div className="space-y-6">
            {/* 1. React Native */}
            <div className="rounded-xl border border-white/10 bg-[#0E1118] overflow-hidden">
              <div className="px-4 py-3 bg-[#151821] border-b border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Smartphone size={14} className="text-blue-400" />
                  <span>React Native: Google Sign-In & Auth Provider (TypeScript)</span>
                </div>
                <button
                  onClick={() => copyToClipboard(reactNativeAuthCode, 'rn')}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium flex items-center gap-1"
                >
                  {copiedKey === 'rn' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto custom-scrollbar max-h-96">
                <code>{reactNativeAuthCode}</code>
              </pre>
            </div>

            {/* 2. Flutter */}
            <div className="rounded-xl border border-white/10 bg-[#0E1118] overflow-hidden">
              <div className="px-4 py-3 bg-[#151821] border-b border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Smartphone size={14} className="text-cyan-400" />
                  <span>Flutter: Google Sign-In & Secure Storage Service (Dart)</span>
                </div>
                <button
                  onClick={() => copyToClipboard(flutterAuthCode, 'flutter')}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium flex items-center gap-1"
                >
                  {copiedKey === 'flutter' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto custom-scrollbar max-h-96">
                <code>{flutterAuthCode}</code>
              </pre>
            </div>

            {/* 3. Node.js Express Admin Auth */}
            <div className="rounded-xl border border-white/10 bg-[#0E1118] overflow-hidden">
              <div className="px-4 py-3 bg-[#151821] border-b border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Server size={14} className="text-emerald-400" />
                  <span>Node.js / Express: Admin Auth Controller (jspl / 6623 verification)</span>
                </div>
                <button
                  onClick={() => copyToClipboard(nodeAdminAuthCode, 'node')}
                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] font-medium flex items-center gap-1"
                >
                  {copiedKey === 'node' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto custom-scrollbar max-h-96">
                <code>{nodeAdminAuthCode}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
