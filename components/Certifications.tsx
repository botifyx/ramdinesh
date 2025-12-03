import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Shield, Cpu, ExternalLink, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

const badges = [
    { badgeName: "LFD125: Security for Software Development Managers", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/76c8bc91-42a6-4f06-9484-df961be2b0c8/blob" },
    { badgeName: "LFW111: Introduction to Node.js", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/80f8381f-784d-4872-8959-a0af8bfe9609/blob" },
    { badgeName: "Generative AI Overview for Project Managers", issuerName: "Project Management Institute", imageUrl: "https://images.credly.com/images/f5c094f4-e07c-44e0-b685-4ffd8980fd53/blob" },
    { badgeName: "LFC108: Cybersecurity Essentials", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/e79f9317-b3f7-4b57-a859-f24d5f25fe36/blob" },
    { badgeName: "SKF100: Understanding the OWASP® Top 10 Security Threats", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/18d8c64f-cf68-4259-b0ef-2a116e9224f1/blob" },
    { badgeName: "LFC110: Fundamentals of Professional Open Source Management", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/1719bbab-f97e-4160-9487-beaa0e0a28f5/Training_Badges_Master_osbestpractices.png" },
    { badgeName: "LFD121: Developing Secure Software", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/ee986187-6637-45e9-8184-8382dc117432/blob" },
    { badgeName: "Business Intelligence Foundation Professional Certification", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/9a13a2d2-c007-4260-81bd-bf5d1ffb9223/image.png" },
    { badgeName: "Business Model Canvas Essentials Professional Certification", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/faf174da-88b2-48f3-83a1-f016f97132cc/image.png" },
    { badgeName: "Survey Contributor of The Agile Adoption Report 2022", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/78fc0757-e9d9-4e92-936e-2490815b4965/image.png" },
    { badgeName: "Getting Started in Cybersecurity 1.0", issuerName: "Fortinet", imageUrl: "https://images.credly.com/images/a026e7f2-08af-4b73-8cc1-5aec7959faf8/image.png" },
    { badgeName: "Introduction to the Threat Landscape 1.0", issuerName: "Fortinet", imageUrl: "https://images.credly.com/images/8395e492-f8aa-4617-a258-6c844f628fa2/image.png" },
    { badgeName: "LFC103: Inclusive Strategies for Open Source", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/ec7dd913-1a42-4986-b627-08121eec53e3/blob" },
    { badgeName: "LFD102: A Beginner's Guide to Open Source Software Development", issuerName: "The Linux Foundation", imageUrl: "https://images.credly.com/images/e99e035b-06c9-4a97-b96e-2cad2756180c/blob" },
    { badgeName: "Cybersecurity Fundamentals", issuerName: "IBM-SkillsBuild", imageUrl: "https://images.credly.com/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png" },
    { badgeName: "Lifelong Learning", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/21e16d4d-d2df-46e6-9098-526caab49e63/blob" },
    { badgeName: "Cognitive Practitioner", issuerName: "IBM", imageUrl: "https://images.credly.com/images/ac149add-c35d-47e0-89ed-af16b9e37e05/Cognitive-Practitioner.png" },
    { badgeName: "IBM Cloud Migration and Modernization Method Explorer 2", issuerName: "IBM", imageUrl: "https://images.credly.com/images/a5068887-6340-494a-8c2c-e1cf6dffa761/Cloud-Migration-and-Modernization-Method-Explorer.png" },
    { badgeName: "Think Like a Hacker", issuerName: "IBM", imageUrl: "https://images.credly.com/images/fb49de32-6a4c-4850-97cc-942b638ae4c3/Think-LIke-a-Hacker.png" },
    { badgeName: "The IBM Way", issuerName: "IBM", imageUrl: "https://images.credly.com/images/009696ad-3bb2-48e7-88d6-48c4a0d2c9a3/The-IBM-Way.png" },
    { badgeName: "IoT - IBM Rational Quality Manager", issuerName: "IBM", imageUrl: "https://images.credly.com/images/c17c28ed-60cc-4049-a86b-de2364b1dfc7/IBM_Rational_Quality_Manager.png" },
    { badgeName: "Energy, Environment and Utilities Industry Jumpstart", issuerName: "IBM", imageUrl: "https://images.credly.com/images/d685a2f3-218d-4147-9de6-455d0a0ddd62/Energy-Industry-Jumpstart.png" },
    { badgeName: "IBM CLM® for SAFe® - Level 1", issuerName: "IBM", imageUrl: "https://images.credly.com/images/fb0ed3a5-d027-4134-87a3-ea2737e5b36f/image.png" },
    { badgeName: "IoT - IBM Rational DOORS Next Generation", issuerName: "IBM", imageUrl: "https://images.credly.com/images/cc8bb991-c106-450b-869f-b80f4bcf098a/IBM_Rational_DOORS_Next_Generation.png" },
    { badgeName: "IoT - IBM Rational Rhapsody for Systems", issuerName: "IBM", imageUrl: "https://images.credly.com/images/c92a7f9b-c406-49b5-af1b-3fcf6a358b88/IBM_Rational_Rhapsody_for_Systems.png" },
    { badgeName: "IBM Associate Project Manager", issuerName: "IBM", imageUrl: "https://images.credly.com/images/01a0af6e-aa37-4a4c-8b84-3a980dda4ff5/PM-Associate.png" },
    { badgeName: "Enterprise Design Thinking Practitioner", issuerName: "IBM", imageUrl: "https://images.credly.com/images/bc08972c-3c7d-4b99-82a0-c94bcca36674/Badges_v8-07_Practitioner.png" },
    { badgeName: "Scrum Foundation Professional Certification", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/4e3d6f9f-55d7-4ea7-b0e6-f4d4ff543e22/image.png" },
    { badgeName: "Scrum Master Professional Certificate", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/916bde6c-7eb3-40da-b698-993bdc8231f5/image.png" },
    { badgeName: "Digital Marketing Professional Certificate", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/1af9d80a-160a-4a5c-ae46-0a51d624a267/Marketing-Digital-Professional-Certificate-DMPC.png" },
    { badgeName: "Fortinet Certified Fundamentals Cybersecurity", issuerName: "Fortinet", imageUrl: "https://images.credly.com/images/22a0ece5-ff05-4594-8320-25e55e9ae203/image.png" },
    { badgeName: "Kanban Essentials Professional Certification", issuerName: "Certiprof", imageUrl: "https://images.credly.com/images/57681a13-253d-4884-a8bf-45803e87f858/image.png" },
    { badgeName: "Microsoft Advertising Display & Video Certification", issuerName: "Microsoft Advertising", imageUrl: "https://images.credly.com/images/db28265f-9e42-4f5c-b5ea-f744be740d56/image.png" },
    { badgeName: "Microsoft Advertising Search Certification", issuerName: "Microsoft Advertising", imageUrl: "https://images.credly.com/images/b72420dc-38fc-4e8c-8b7d-61edf3f87258/image.png" },
    { badgeName: "IoT - Maximo - INFOR take out Tactic", issuerName: "IBM", imageUrl: "https://images.credly.com/images/10ac2695-a9e3-44bb-88d4-c781ff96a765/SF-Maximo_INFOR_Take_Out_Tactic.png" },
    { badgeName: "IoT - Optimize Operations with AI - Introduction", issuerName: "IBM", imageUrl: "https://images.credly.com/images/cf63aec9-fe9a-439f-b536-985fa4f86f6e/SF-Optimize_Ops_with_AI_Intro.png" }
];

const Certifications: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const initialCount = 12;
    const displayedBadges = showAll ? badges : badges.slice(0, initialCount);

    return (
        <section id="certifications" className="py-24 bg-void relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Award className="w-6 h-6 text-emerald-400" />
                            <span className="font-mono text-emerald-400/80 text-sm tracking-widest uppercase">Validated Expertise</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">BADGES</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
                            A collection of verified certifications across Cybersecurity, Cloud Computing, AI, and Agile methodologies.
                        </p>
                    </div>

                    <a
                        href="https://www.credly.com/users/ramdinesh-boopalan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-full bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        VERIFIED ON CREDLY
                    </a>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                >
                    <AnimatePresence>
                        {displayedBadges.map((badge, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                key={badge.imageUrl} // Using image URL as key since names might duplicate
                                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center text-center"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                                <div className="relative w-24 h-24 mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={badge.imageUrl}
                                        alt={badge.badgeName}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="relative z-10 w-full">
                                    <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 min-h-[2.5em]" title={badge.badgeName}>
                                        {badge.badgeName}
                                    </h3>
                                    <p className="text-slate-500 text-xs font-mono truncate">
                                        {badge.issuerName}
                                    </p>
                                </div>

                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ExternalLink className="w-3 h-3 text-emerald-400" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {badges.length > initialCount && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="group flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-full text-white font-medium transition-all duration-300"
                        >
                            {showAll ? (
                                <>
                                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                                    Show All ({badges.length - initialCount} More)
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Certifications;
