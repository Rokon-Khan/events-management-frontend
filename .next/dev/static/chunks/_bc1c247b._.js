(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom_c91534e86f74096d969606227a1c49a3/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/mock-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "eventCategories",
    ()=>eventCategories,
    "interestOptions",
    ()=>interestOptions,
    "mockBookings",
    ()=>mockBookings,
    "mockEvents",
    ()=>mockEvents,
    "mockReviews",
    ()=>mockReviews,
    "mockUsers",
    ()=>mockUsers
]);
const mockUsers = [
    {
        id: "user_1",
        email: "john@example.com",
        fullName: "John Anderson",
        role: "user",
        avatar: "/professional-man-headshot.png",
        bio: "Adventure seeker and music enthusiast. Always looking for new experiences!",
        interests: [
            "Music",
            "Hiking",
            "Photography",
            "Travel"
        ],
        location: "San Francisco, CA",
        createdAt: "2024-01-15T10:00:00Z",
        rating: 4.8,
        reviewCount: 12
    },
    {
        id: "user_2",
        email: "sarah@example.com",
        fullName: "Sarah Mitchell",
        role: "host",
        avatar: "/professional-woman-headshot.png",
        bio: "Event organizer passionate about bringing people together. Specializing in outdoor adventures and cultural experiences.",
        interests: [
            "Events",
            "Outdoor",
            "Culture",
            "Networking"
        ],
        location: "Los Angeles, CA",
        createdAt: "2023-08-20T10:00:00Z",
        rating: 4.9,
        reviewCount: 45
    },
    {
        id: "user_3",
        email: "mike@example.com",
        fullName: "Mike Chen",
        role: "host",
        avatar: "/asian-man-professional-headshot.png",
        bio: "Tech meetup organizer and board game enthusiast. Building community through shared interests.",
        interests: [
            "Technology",
            "Gaming",
            "Startups",
            "Coffee"
        ],
        location: "Seattle, WA",
        createdAt: "2023-11-05T10:00:00Z",
        rating: 4.7,
        reviewCount: 28
    },
    {
        id: "user_4",
        email: "emma@example.com",
        fullName: "Emma Wilson",
        role: "user",
        avatar: "/young-woman-smiling-headshot.png",
        bio: "Yoga instructor and wellness advocate. Love connecting with mindful individuals.",
        interests: [
            "Yoga",
            "Wellness",
            "Meditation",
            "Healthy Living"
        ],
        location: "Austin, TX",
        createdAt: "2024-02-10T10:00:00Z",
        rating: 4.6,
        reviewCount: 8
    },
    {
        id: "admin_1",
        email: "admin@eventhub.com",
        fullName: "Admin User",
        role: "admin",
        avatar: "/administrator-avatar.jpg",
        bio: "Platform administrator",
        interests: [],
        location: "Remote",
        createdAt: "2023-01-01T10:00:00Z",
        rating: 5,
        reviewCount: 0
    }
];
const mockEvents = [
    {
        id: "event_1",
        name: "Sunset Hiking Adventure",
        description: "Join us for a breathtaking sunset hike through the coastal trails. Perfect for beginners and experienced hikers alike. We'll capture amazing photos and enjoy the beautiful California coastline.",
        category: "hiking",
        date: "2025-01-15",
        time: "16:00",
        location: "Marin Headlands",
        address: "948 Fort Barry, Sausalito, CA 94965",
        image: "/sunset-hiking-trail-mountains.jpg",
        hostId: "user_2",
        host: mockUsers[1],
        minParticipants: 4,
        maxParticipants: 12,
        currentParticipants: 8,
        participants: [
            mockUsers[0],
            mockUsers[3]
        ],
        fee: 15,
        status: "open",
        createdAt: "2024-12-01T10:00:00Z"
    },
    {
        id: "event_2",
        name: "Board Game Night",
        description: "Weekly board game night at the local cafe. Bring your favorite games or try out our collection. Great way to meet new people and have fun!",
        category: "gaming",
        date: "2025-01-10",
        time: "19:00",
        location: "GameHaus Cafe",
        address: "1800 S Brand Blvd, Glendale, CA 91204",
        image: "/board-games-night-friends-playing.jpg",
        hostId: "user_3",
        host: mockUsers[2],
        minParticipants: 6,
        maxParticipants: 20,
        currentParticipants: 14,
        participants: [
            mockUsers[0]
        ],
        fee: 0,
        status: "open",
        createdAt: "2024-12-05T10:00:00Z"
    },
    {
        id: "event_3",
        name: "Jazz Night at Blue Note",
        description: "Experience live jazz at one of the most iconic jazz clubs. Featuring local artists and a welcoming atmosphere for jazz lovers of all backgrounds.",
        category: "music",
        date: "2025-01-20",
        time: "20:00",
        location: "Blue Note Jazz Club",
        address: "131 W 3rd St, New York, NY 10012",
        image: "/jazz-club-live-music-performance.jpg",
        hostId: "user_2",
        host: mockUsers[1],
        minParticipants: 8,
        maxParticipants: 25,
        currentParticipants: 18,
        participants: [
            mockUsers[3]
        ],
        fee: 35,
        status: "open",
        createdAt: "2024-12-08T10:00:00Z"
    },
    {
        id: "event_4",
        name: "Tech Startup Networking",
        description: "Connect with fellow entrepreneurs, developers, and tech enthusiasts. Share ideas, find collaborators, and grow your network in the tech industry.",
        category: "tech",
        date: "2025-01-25",
        time: "18:00",
        location: "WeWork Downtown",
        address: "600 California St, San Francisco, CA 94108",
        image: "/tech-networking-event-startup-meetup.jpg",
        hostId: "user_3",
        host: mockUsers[2],
        minParticipants: 15,
        maxParticipants: 50,
        currentParticipants: 32,
        participants: [
            mockUsers[0]
        ],
        fee: 10,
        status: "open",
        createdAt: "2024-12-10T10:00:00Z"
    },
    {
        id: "event_5",
        name: "Morning Yoga in the Park",
        description: "Start your day with energizing yoga sessions in the beautiful park setting. All levels welcome. Bring your own mat or borrow one of ours.",
        category: "wellness",
        date: "2025-01-12",
        time: "07:00",
        location: "Golden Gate Park",
        address: "Music Concourse Dr, San Francisco, CA 94122",
        image: "/outdoor-yoga-park-morning-sunrise.jpg",
        hostId: "user_2",
        host: mockUsers[1],
        minParticipants: 5,
        maxParticipants: 30,
        currentParticipants: 22,
        participants: [
            mockUsers[3]
        ],
        fee: 12,
        status: "open",
        createdAt: "2024-12-12T10:00:00Z"
    },
    {
        id: "event_6",
        name: "Food Tour: Little Italy",
        description: "Discover the best authentic Italian restaurants, bakeries, and cafes. Sample delicious food while learning about the neighborhood's rich history.",
        category: "food",
        date: "2025-01-18",
        time: "11:00",
        location: "Little Italy",
        address: "Mulberry St, New York, NY 10013",
        image: "/italian-food-tour-restaurant-pasta.jpg",
        hostId: "user_2",
        host: mockUsers[1],
        minParticipants: 6,
        maxParticipants: 15,
        currentParticipants: 12,
        participants: [
            mockUsers[0],
            mockUsers[3]
        ],
        fee: 45,
        status: "open",
        createdAt: "2024-12-15T10:00:00Z"
    },
    {
        id: "event_7",
        name: "Art Gallery Opening",
        description: "Be part of an exclusive gallery opening featuring emerging contemporary artists. Enjoy wine, appetizers, and meaningful conversations about art.",
        category: "art",
        date: "2025-02-01",
        time: "19:00",
        location: "Modern Art Gallery",
        address: "450 Broadway, Los Angeles, CA 90013",
        image: "/art-gallery-opening-modern-exhibition.jpg",
        hostId: "user_2",
        host: mockUsers[1],
        minParticipants: 10,
        maxParticipants: 40,
        currentParticipants: 28,
        participants: [],
        fee: 25,
        status: "open",
        createdAt: "2024-12-18T10:00:00Z"
    },
    {
        id: "event_8",
        name: "Basketball Pickup Game",
        description: "Weekly basketball pickup games for all skill levels. Come for the exercise, stay for the community. Beginners and experienced players welcome!",
        category: "sports",
        date: "2025-01-14",
        time: "10:00",
        location: "Venice Beach Courts",
        address: "1800 Ocean Front Walk, Venice, CA 90291",
        image: "/basketball-outdoor-court-game.jpg",
        hostId: "user_3",
        host: mockUsers[2],
        minParticipants: 10,
        maxParticipants: 20,
        currentParticipants: 16,
        participants: [
            mockUsers[0]
        ],
        fee: 0,
        status: "open",
        createdAt: "2024-12-20T10:00:00Z"
    }
];
const mockReviews = [
    {
        id: "review_1",
        eventId: "event_1",
        userId: "user_1",
        user: mockUsers[0],
        hostId: "user_2",
        rating: 5,
        comment: "Amazing experience! Sarah is an incredible host who made everyone feel welcome. The sunset views were breathtaking.",
        createdAt: "2024-11-20T10:00:00Z"
    },
    {
        id: "review_2",
        eventId: "event_2",
        userId: "user_4",
        user: mockUsers[3],
        hostId: "user_3",
        rating: 4,
        comment: "Great selection of games and friendly atmosphere. Mike knows how to keep everyone engaged. Will definitely come back!",
        createdAt: "2024-11-25T10:00:00Z"
    },
    {
        id: "review_3",
        eventId: "event_3",
        userId: "user_1",
        user: mockUsers[0],
        hostId: "user_2",
        rating: 5,
        comment: "The jazz night was phenomenal. Sarah picked the perfect venue and the live music was incredible. Highly recommend!",
        createdAt: "2024-12-01T10:00:00Z"
    }
];
const mockBookings = [
    {
        id: "booking_1",
        eventId: "event_1",
        event: mockEvents[0],
        userId: "user_1",
        user: mockUsers[0],
        status: "confirmed",
        paidAmount: 15,
        bookedAt: "2024-12-05T10:00:00Z"
    },
    {
        id: "booking_2",
        eventId: "event_3",
        event: mockEvents[2],
        userId: "user_4",
        user: mockUsers[3],
        status: "confirmed",
        paidAmount: 35,
        bookedAt: "2024-12-10T10:00:00Z"
    }
];
const eventCategories = [
    {
        value: "concert",
        label: "Concerts",
        icon: "Music"
    },
    {
        value: "sports",
        label: "Sports",
        icon: "Trophy"
    },
    {
        value: "hiking",
        label: "Hiking",
        icon: "Mountain"
    },
    {
        value: "gaming",
        label: "Gaming",
        icon: "Gamepad2"
    },
    {
        value: "food",
        label: "Food & Dining",
        icon: "UtensilsCrossed"
    },
    {
        value: "art",
        label: "Art & Culture",
        icon: "Palette"
    },
    {
        value: "tech",
        label: "Tech & Startup",
        icon: "Laptop"
    },
    {
        value: "music",
        label: "Music",
        icon: "Headphones"
    },
    {
        value: "wellness",
        label: "Wellness",
        icon: "Heart"
    },
    {
        value: "social",
        label: "Social",
        icon: "Users"
    }
];
const interestOptions = [
    "Music",
    "Sports",
    "Hiking",
    "Photography",
    "Travel",
    "Gaming",
    "Technology",
    "Art",
    "Food",
    "Wellness",
    "Yoga",
    "Reading",
    "Movies",
    "Dancing",
    "Cooking",
    "Fitness",
    "Nature",
    "Networking",
    "Meditation",
    "Coffee",
    "Wine",
    "Theater",
    "Comedy",
    "Volunteering"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mock-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Check for stored user session
            const storedUser = localStorage.getItem("eventhub_user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const login = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[login]": async (email, password)=>{
            // Mock authentication
            const foundUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find({
                "AuthProvider.useCallback[login].foundUser": (u)=>u.email === email
            }["AuthProvider.useCallback[login].foundUser"]);
            if (foundUser && password === "password123") {
                setUser(foundUser);
                localStorage.setItem("eventhub_user", JSON.stringify(foundUser));
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: "Invalid email or password"
            };
        }
    }["AuthProvider.useCallback[login]"], []);
    const register = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[register]": async (data)=>{
            // Mock registration
            const existingUser = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockUsers"].find({
                "AuthProvider.useCallback[register].existingUser": (u)=>u.email === data.email
            }["AuthProvider.useCallback[register].existingUser"]);
            if (existingUser) {
                return {
                    success: false,
                    error: "Email already exists"
                };
            }
            const newUser = {
                id: `user_${Date.now()}`,
                email: data.email,
                fullName: data.fullName,
                role: data.role || "user",
                avatar: `/placeholder.svg?height=100&width=100&query=avatar ${data.fullName}`,
                bio: "",
                interests: [],
                location: "",
                createdAt: new Date().toISOString(),
                rating: 0,
                reviewCount: 0
            };
            setUser(newUser);
            localStorage.setItem("eventhub_user", JSON.stringify(newUser));
            return {
                success: true
            };
        }
    }["AuthProvider.useCallback[register]"], []);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            setUser(null);
            localStorage.removeItem("eventhub_user");
        }
    }["AuthProvider.useCallback[logout]"], []);
    const updateUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateUser]": (data)=>{
            if (user) {
                const updatedUser = {
                    ...user,
                    ...data
                };
                setUser(updatedUser);
                localStorage.setItem("eventhub_user", JSON.stringify(updatedUser));
            }
        }
    }["AuthProvider.useCallback[updateUser]"], [
        user
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            login,
            register,
            logout,
            updateUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "LyavxGHM4DvtVamhZe6vvrtrJLk=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/sonner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next-themes@0.4.6_react-dom_c91534e86f74096d969606227a1c49a3/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/sonner@2.0.7_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Toaster = ({ ...props })=>{
    _s();
    const { theme = 'system' } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$7_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            '--normal-bg': 'var(--popover)',
            '--normal-text': 'var(--popover-foreground)',
            '--normal-border': 'var(--border)'
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Toaster, "bbCbBsvL7+LiaR8ofHlkcwveh/Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$2d$themes$40$0$2e$4$2e$6_react$2d$dom_c91534e86f74096d969606227a1c49a3$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = Toaster;
;
var _c;
__turbopack_context__.k.register(_c, "Toaster");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_bc1c247b._.js.map