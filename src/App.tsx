import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Book, ShieldAlert, TrainFront, ChevronLeft, MapPin, ScanLine, Skull, Eye, Crosshair, Flame, Activity, Package, DollarSign } from 'lucide-react';
import { cn } from './lib/utils';

// --- Placeholder Page Components ---

function PageHeader({ title, subtitle, icon: Icon }: { title: string; subtitle: string; icon: React.ElementType }) {
  return (
    <div className="mb-12 border-b border-neutral-800 pb-8">
      <Link to="/" className="inline-flex items-center text-neutral-500 hover:text-red-500 mb-8 transition-colors uppercase tracking-widest text-xs font-bold font-mono">
        <ChevronLeft className="w-4 h-4 mr-1" />
        지휘 통제실 복귀 (Return to HQ)
      </Link>
      <div className="flex items-center gap-4">
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-red-500">
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">{title}</h1>
          <p className="text-neutral-400 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-64 bg-neutral-900/50 rounded border border-neutral-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-600 font-mono text-sm tracking-widest text-center">
          <ScanLine className="w-8 h-8 mx-auto mb-2 opacity-50" />
          데이터 접근 권한 확인 중...<br/>(Awaiting clearance)
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-32 bg-neutral-900/30 rounded border border-neutral-800/30" />
        <div className="h-32 bg-neutral-900/30 rounded border border-neutral-800/30" />
      </div>
    </div>
  );
}

const CHARACTERS_DATA = [
  {
    id: 'C-01',
    name: '일라이 (Eli)',
    role: '전직 배관공 / 도망자',
    faction: '무소속',
    status: '추적당하는 중 (HUNTED)',
    desc: '지하의 환풍구와 배관 구조를 완벽하게 파악하고 있는 생존자. 빛의 교단이 숨기고 있던 노후화된 배수로의 치명적 결함을 발견한 후 사냥의 표적이 되었다.',
    dangerLevel: 'CRITICAL',
    imageType: 'SURVIVOR',
    imagePath: 'https://i.postimg.cc/Ls2DQyjS/jemog-eul-iblyeoghaejuseyo-(4).png'
  },
  {
    id: 'C-02',
    name: '하운드-07 (Hound-07)',
    role: '이단 심문관',
    faction: '빛의 교단',
    status: '추적 중 (HUNTING)',
    desc: '감정을 제거당한 채 오직 사냥만을 위해 훈련된 빛의 교단의 정예 추적자. 소음기가 장착된 저격총과 열화상 감지기로 완전한 어둠 속에서 목표를 유린한다.',
    dangerLevel: 'EXTREME',
    imageType: 'HUNTER'
  },
  {
    id: 'C-03',
    name: '마담 티 (Madame T)',
    role: '상단 주도자',
    faction: '블랙 마켓',
    status: '관망 중 (NEUTRAL)',
    desc: '탄피 하나에 목숨표 하나를 거래하는 지하 세계의 대상인. 그 누구도 그녀의 진짜 얼굴을 10초 이상 본 적이 없으며, 항상 두꺼운 방진 마스크 뒤에 숨어 있다.',
    dangerLevel: 'MEDIUM',
    imageType: 'MERCHANT'
  },
  {
    id: 'C-04',
    name: '크로우 (Crow)',
    role: '길잡이',
    faction: '맥박 감시자',
    status: '도주 지원 (SUPPORT)',
    desc: '소리만으로 모든 움직임을 파악해내는 정보조직의 말단. 과거 사냥개들의 이명 함정에 걸려 청력을 일부 잃었지만, 뼈의 진동으로 선로의 맥박을 읽어낸다.',
    dangerLevel: 'HIGH',
    imageType: 'SCOUT'
  }
];

function CharactersPage() {
  const [activeCharacter, setActiveCharacter] = useState<typeof CHARACTERS_DATA[0] | null>(null);
  const [viewingImage, setViewingImage] = useState<string | null>(null);

  // Esc key closure
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewingImage(prev => {
          if (prev) return null;
          setActiveCharacter(null);
          return null;
        });
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto pt-16 px-6 pb-24 h-full relative z-10">
        <PageHeader title="등장인물 (Characters)" subtitle="생존자, 추적자, 그리고 도망자들의 기록" icon={Users} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHARACTERS_DATA.map((char, i) => (
            <motion.div 
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveCharacter(char)}
              className="group cursor-pointer border border-zinc-800 bg-[#141414] p-4 flex flex-col items-center justify-center aspect-[3/4] hover:border-zinc-500 transition-colors relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-24 h-24 mb-6 rounded-full bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center overflow-hidden">
                {char.imagePath ? <img src={char.imagePath} alt={char.name} className="w-full h-full object-cover" /> : <Users className="w-10 h-10 text-zinc-700" />}
              </div>
              <h3 className="font-sans font-bold text-lg text-zinc-200 uppercase tracking-widest">{char.name}</h3>
              <p className="text-zinc-500 font-mono text-xs mt-2">{char.id}</p>
              
              <div className="mt-4 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono tracking-widest text-zinc-400">
                조회 가능 (CLICK TO VIEW)
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ID Card Overlay Modal */}
      <AnimatePresence>
        {activeCharacter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden pointer-events-none"
          >
            {/* Dark background - pointer events auto to allow clicking to close */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
              onClick={() => setActiveCharacter(null)}
            />
            
            {/* Swinging ID Card Container */}
            <motion.div
              initial={{ y: '-100vh', rotate: -15 }}
              animate={{ y: 0, rotate: 0 }}
              exit={{ y: '100vh', rotate: 10, transition: { type: 'spring', stiffness: 50, damping: 15 } }}
              transition={{ 
                type: 'spring', 
                bounce: 0.6, 
                damping: 10, 
                stiffness: 70,
                duration: 1
              }}
              className="relative flex flex-col items-center pointer-events-auto cursor-default mt-0 sm:mt-[2vh]"
              style={{ transformOrigin: 'top center' }}
            >
              {/* Lanyard / String */}
              <div className="w-1.5 h-[20vh] sm:h-[15vh] bg-gradient-to-b from-zinc-950 to-zinc-700 mx-auto shadow-inner border-x border-zinc-950/50" />
              
              {/* Metal clip */}
              <div className="w-6 h-8 bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-sm mx-auto shadow-md border-b-[3px] border-zinc-600 z-10 flex items-center justify-center">
                <div className="w-2 h-4 bg-zinc-800 rounded-full border border-zinc-600/50 shadow-inner"></div>
              </div>
              
              {/* Card holder hole */}
              <div className="-mt-3 w-8 h-4 border-[3px] border-zinc-400 rounded-full bg-[#111] z-20 shadow-md"></div>
              
              {/* The actual ID Card */}
              <div 
                className="w-72 sm:w-80 bg-[#141414] border border-zinc-700/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden relative -mt-1"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hologram / Reflection overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 z-20" />
                
                {/* Card Header */}
                <div className="bg-zinc-900 border-b border-zinc-800 h-16 flex items-center justify-between px-6 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">ID. {activeCharacter.id}</span>
                    <span className="text-xs text-red-500 font-bold font-mono tracking-widest leading-none">METRO_SECURE_AUTH</span>
                  </div>
                  <ScanLine className="text-zinc-600 w-6 h-6" />
                </div>
                
                {/* Visual / Portrait Area */}
                <div className="px-6 py-5 flex items-start gap-4">
                  <div 
                    className={cn("w-20 h-24 bg-zinc-900 border flex items-center justify-center overflow-hidden shrink-0 filter sepia-[0.3] hue-rotate-[-30deg]", activeCharacter.imagePath ? "cursor-pointer border-zinc-500 hover:border-zinc-300 transition-colors" : "border-zinc-700")}
                    onClick={(e) => {
                      if (activeCharacter.imagePath) {
                        e.stopPropagation();
                        setViewingImage(activeCharacter.imagePath);
                      }
                    }}
                  >
                    {activeCharacter.imagePath ? <img src={activeCharacter.imagePath} alt={activeCharacter.name} className="w-full h-full object-cover transition-transform hover:scale-110" /> : <Users className="text-zinc-700 w-12 h-12" />}
                  </div>
                  <div className="flex flex-col gap-3 py-1">
                    <div>
                      <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-0.5">Name / Callsign</div>
                      <div className="font-bold font-sans text-lg text-white leading-tight">{activeCharacter.name}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mb-0.5">Faction</div>
                      <div className="text-sm font-sans text-amber-500/90">{activeCharacter.faction}</div>
                    </div>
                  </div>
                </div>
                
                {/* Data Fields */}
                <div className="px-6 pb-6 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-zinc-800 bg-zinc-950 p-2 rounded">
                      <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">Role</div>
                      <div className="text-xs text-zinc-300 font-sans">{activeCharacter.role}</div>
                    </div>
                    <div className="border border-zinc-800 bg-zinc-950 p-2 rounded">
                      <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-1">Status</div>
                      <div className={cn("text-xs font-mono font-bold tracking-tight", 
                        activeCharacter.status.includes('HUNTED') ? 'text-blue-500' : 
                        activeCharacter.status.includes('HUNTING') ? 'text-red-500' : 'text-zinc-300'
                      )}>{activeCharacter.status}</div>
                    </div>
                  </div>
                  
                  <div className="border border-zinc-800 bg-zinc-950 p-3 rounded h-32 overflow-y-auto">
                    <div className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest mb-2 flex items-center gap-2">
                       <span>Clearance Notes</span>
                       <div className="flex-1 h-[1px] bg-zinc-800"></div>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed break-keep">
                      {activeCharacter.desc}
                    </p>
                  </div>
                  
                  {/* Footer Bar / Barcode */}
                  <div className="mt-2 pt-4 border-t border-zinc-800 flex justify-center items-center opacity-70">
                    <div className="font-[barcode] font-mono text-zinc-500 tracking-[-0.2em] text-3xl" style={{fontFamily: 'monospace'}}>
                      ||||| | ||| |||| | |||
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveCharacter(null)}
                  className="absolute top-2 right-2 text-zinc-500 hover:text-white p-2 transition-colors focus:outline-none z-30"
                >
                  <span className="sr-only">Close</span>
                  <div className="w-4 h-[2px] bg-current rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-4 h-[2px] bg-current -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Image Overlay */}
      <AnimatePresence>
        {viewingImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
          >
            <div 
              className="absolute inset-0 bg-black/95 cursor-pointer backdrop-blur-md"
              onClick={() => setViewingImage(null)}
            />
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }}
              src={viewingImage} 
              alt="Full Character Portrait" 
              className="relative z-10 max-w-[90vw] max-h-[90vh] object-contain border border-zinc-800 shadow-2xl"
            />
            <button 
              onClick={() => setViewingImage(null)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white p-2 transition-colors focus:outline-none z-20"
            >
              <span className="sr-only">Close</span>
              <div className="w-6 h-[2px] bg-current rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-6 h-[2px] bg-current -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const TERMINOLOGY_DATA = [
  {
    term: '포자 역병과 네블라이저',
    type: '질병/의료',
    description: '호흡기로 감염되는 치명적 역병. 환풍기조차 멈춘 지하의 축축한 공기 속에 퍼져있다. 수건으로도 방어 가능하며, 호흡기(네블라이저)로 감염 진행을 막을 수 있지만, 고요한 어둠 속에서 울리는 "칙-" 하는 작동음은 도망자의 위치를 사냥개에게 알리는 죽음의 타이머가 된다.',
    dangerLevel: 'CRITICAL'
  },
  {
    term: '이명 함정 (Acoustic Shock)',
    type: '전투 환경',
    description: '방음 설계에도 불구하고 좁고 밀폐된 호선 구조 탓에, 소음기 없는 총성은 쏜 사람마저 고막이 찢어질 듯한 일시적 이명과 방향 상실에 빠뜨린다. 이때문에 총기 사용은 최후의 수단으로 억제되며, 어둠 속에서의 발소리와 숨소리를 의식한 극한의 심리전과 서늘한 근접전이 주를 이룬다.',
    dangerLevel: 'HIGH'
  },
  {
    term: '황동폐 (탄피 / Brass Coin)',
    type: '경제/화폐',
    description: '총기 소음의 리스크 탓에 가치가 폭등한 탄피는 화폐를 대신한다. 주머니 속에서 부딪히는 둔탁한 금속음은 부의 상징이나, 절체절명의 도주 중 실수로 바닥에 떨어뜨린 탄피 하나가 내는 맑은 금속성은 도망자의 심장을 얼어붙게 만드는 죽음의 서곡이다.',
    dangerLevel: 'MEDIUM'
  },
  {
    term: '새벽 결로 (Dawn Condensation)',
    type: '생존 환경',
    description: '입김이 날 정도로 서늘하고 눅눅한 곳이기에, 영하로 떨어지는 새벽이면 벽에 물방울(결로)이 맺힌다. 식수를 구할 유일한 시간이지만, 벽에 붙어 물을 모아야 하는 이 무방비한 찰나의 시간은 추적자들이 도망자를 노리는 가장 완벽한 사냥 타이밍이다.',
    dangerLevel: 'HIGH'
  },
  {
    term: '저전력 시간대 (Low-Power Cycle)',
    type: '돌발 상황/전술',
    description: '전력망이 복구되는 12시에서 15시를 제외하면 지하는 희미한 비상등만 켜진 서늘한 저전력 상태로 전환된다. 환기구 팬조차 멈춘 이 숨막히는 침묵의 시간대, 추적자들은 발걸음 소리 하나, 심장 박동 하나를 쫓아 어둠 속에서 사냥을 시작한다.',
    dangerLevel: 'CRITICAL'
  },
  {
    term: '드라운드 은폐 (Drowned Camo)',
    type: '은폐 전술/외부 위협',
    description: '포자에 심각하게 감염되어 지상을 배회하는 괴물들. 간혹 지하로 틈입하지만 눅눅하고 서늘한 공기 탓에 금방 떠난다. 코너에 몰린 기민한 도망자는 추적자의 열화상 스캔을 속이기 위해, 잠시 내려온 드라운드의 악취 나는 군집 속에 무모하게 숨어들어가는 악몽 같은 심리전을 벌인다.',
    dangerLevel: 'HIGH'
  },
  {
    term: '환풍구 (Ventilation Shaft)',
    type: '이동 통로/지형',
    description: '다른 건물의 규격과 달리 성인 여성이 겨우 기어 들어갈 수 있을 정도로 거대하게 설계된 비좁은 통로. 전력이 집중되는 시간대(12시~15시)를 제외하면 팬이 멈추기 때문에 은밀한 주요 이동 경로로 쓰인다. 하지만 추적자의 열화상 감지기에 체온이 그대로 노출되며, 퇴로가 없어 발각되면 강철 무덤이 되고 만다.',
    dangerLevel: 'CRITICAL'
  },
  {
    term: '빈터 역 (Barren Station)',
    type: '장소 분류',
    description: '가장 흔히 싸움이 일어나는 구역. 버려진 구조물과 잔해들이 널려있어 엄폐물이 가득하다. 기습과 매복의 온상이며, 추적자를 피해 숨어들기 좋지만 반대로 누군가 이미 숨어있을 확률이 가장 높다.',
    dangerLevel: 'HIGH'
  },
  {
    term: '광장 역 (Plaza Station)',
    type: '장소 분류',
    description: '다른 역들과 비교해 이질적일 정도로 넒고 탁 트인 거대한 돔형 역. 버려진 물자가 풍부하게 남아있지만 숨을 곳이 전혀 없다. 이곳을 건너는 도망자는 사방의 어둠 속에서 조준경이 자신을 향하고 있다는 공포와 싸워야 한다.',
    dangerLevel: 'CRITICAL'
  },
  {
    term: '상점 역 (Merchant Station)',
    type: '장소 분류',
    description: '외곽 홀수 구역에 주로 위치한 작은 역. 정체를 알 수 없는 상인이 자리잡고 있으며, 황동폐(탄피)를 물자로 교환해 준다. 상인을 건드리지 않는 것이 메트로 헬의 암묵적인 규칙이다.',
    dangerLevel: 'MEDIUM'
  },
  {
    term: '기둥 역 (Pillar Station)',
    type: '장소 분류',
    description: '천장을 떠받치는 거대하고 굵은 원형 기둥이 중심에 박혀있는 역. 추적자와 도망자가 기둥을 사이에 두고 서로의 발소리와 그림자를 쫓으며 빙글빙글 도는, 숨막히는 술래잡기의 무대가 되는 곳이다.',
    dangerLevel: 'HIGH'
  },
  {
    term: '밀폐 역 (Sealed Station)',
    type: '장소 분류',
    description: '극도로 좁고 천장이 낮아 밀실 공포증을 유발하는 구조의 작은 역. 퇴로가 제한적이기 때문에 사냥개(추적자)들이 도망자를 몰아넣어 처리하기 가장 좋아하는 압박 전술의 종착지점이다.',
    dangerLevel: 'CRITICAL'
  },
  {
    term: '폐철 역 (Scrapyard Station)',
    type: '장소 분류',
    description: '부서진 열차 객차와 고철 쓰레기 산이 끝없이 쌓여있는 역. 판매할 만한 멀쩡한 금속은 없지만, 급조 무기를 만들거나 부비트랩을 설치하기에 최적의 환경이다.',
    dangerLevel: 'MEDIUM'
  }
];

function TerminologyPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto pt-16 px-6 pb-24">
      <PageHeader title="용어 (Terminology)" subtitle="쫓는 자와 쫓기는 자들의 어둠 속 스릴러 지식표" icon={Book} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TERMINOLOGY_DATA.map((item, idx) => (
          <motion.div 
            key={item.term}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="border border-zinc-800 bg-[#141414] p-6 md:p-8 relative group overflow-hidden hover:border-red-900/50 transition-colors cursor-crosshair"
          >
            {/* Background number */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] font-mono text-8xl font-black text-red-500 overflow-hidden pointer-events-none group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
              {String(idx + 1).padStart(2, '0')}
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10 gap-4">
              <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight">{item.term}</h3>
              <span className={cn("text-[10px] font-mono tracking-widest px-2 py-1 border rounded-sm whitespace-nowrap", 
                item.dangerLevel === 'CRITICAL' ? 'border-red-900 text-red-500 bg-red-950/30' : 
                item.dangerLevel === 'HIGH' ? 'border-amber-900 text-amber-500 bg-amber-950/30' : 
                'border-zinc-800 text-zinc-400 bg-zinc-900')}>
                RISK: {item.dangerLevel}
              </span>
            </div>
            
            <div className="text-xs font-mono text-amber-600 mb-3 tracking-widest relative z-10 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
              [{item.type}]
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-sans relative z-10 break-keep min-h-[4rem]">
              {item.description}
            </p>
            
            {/* Bottom Accent */}
            <div className="mt-8 pt-4 border-t border-zinc-800/50 flex items-center justify-between pointer-events-none relative z-10">
              <div className="flex items-center gap-2 text-zinc-600">
                <ScanLine className="w-4 h-4" />
                <span className="text-[10px] uppercase font-mono tracking-widest">Entry File #{idx + 1}</span>
              </div>
              <div className="h-1 w-16 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full bg-red-900 w-1/4 group-hover:w-full transition-all duration-1000"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const FACTIONS_DATA = [
  {
    name: '빛의 교단 (Order of Lumina)',
    symbol: Eye,
    territory: '종착역 (Terminus) 및 1, 2호선',
    description: '전력이 회복되는 12~15시의 "빛"을 신성시하는 광신도 집단. 지하의 시스템 코어를 장악하고 전력을 통제한다. 규율을 어기거나 불복종하는 자들을 이단으로 몰아 무자비하게 사냥하며, 이들의 이단 심문관(사냥개)들은 소음기가 장착된 정밀 소총과 야간 투시경으로 어둠 속의 사냥을 즐긴다.',
    color: 'text-amber-400',
    borderColor: 'border-amber-900/50',
    bgColor: 'bg-amber-950/30'
  },
  {
    name: '녹슨 이빨 (Rusty Fangs)',
    symbol: Skull,
    territory: '7, 8, 9호선 폐철 역 중심',
    description: '폭력과 약탈로 연명하는 잔혹한 갱단. 규율은 오직 피의 복수뿐. 화기보다는 폐철로 직접 만든 육중한 근접 무기와 급조 폭발물을 애용하며, 그들의 영역에 발을 들인 도망자는 사냥당하는 내내 쇠붙이가 끌리는 소리와 짐승 같은 울음소리에 시달리다 신경쇠약에 빠지게 된다.',
    color: 'text-red-500',
    borderColor: 'border-red-900/50',
    bgColor: 'bg-red-950/30'
  },
  {
    name: '블랙 마켓 (The Exchange)',
    symbol: DollarSign,
    territory: '외곽선 등 각 호선의 상점 역',
    description: '황동폐(탄피) 아래 모든 것을 거래하는 무자비한 자본 세력. 물자뿐만 아니라 도망자의 현상금, 노선의 노후화 비밀, 심지어 추적자의 정보까지 거래한다. 철저히 이해타산적이며, 보수가 높다면 추적자에게 도망자의 위치를 팔아넘기거나 도망자에게 살상 무기를 제공하는 기회주의의 정점이다.',
    color: 'text-emerald-500',
    borderColor: 'border-emerald-900/50',
    bgColor: 'bg-emerald-950/30'
  },
  {
    name: '정화조 (The Purifiers)',
    symbol: Flame,
    territory: '12, 13호선 등 포자 감염 심각 구역',
    description: '언제나 방독면과 낡은 방호복을 뒤집어쓰고 다니며, "포자 역병"의 완벽한 박멸을 위해 감염된 자나 의심 구역 자체를 화염방사기로 불태우는 극단적 집단. 이들이 지나간 자리는 잔열이 너무 강하게 남아 열화상 추적기조차 무용지물이 된다.',
    color: 'text-orange-500',
    borderColor: 'border-orange-900/50',
    bgColor: 'bg-orange-950/30'
  },
  {
    name: '맥박 감시자 (Pulse Watchers)',
    symbol: Activity,
    territory: '외곽 순환선 및 블라인드 섹터',
    description: '어떤 세력에도 속하지 않은 미지의 정보망. 무력 충돌보다는 숨는 것에 특화된 생존 전문가들이다. 선로나 환풍구를 통한 미세한 진동, 결로 맺히는 소리까지 포착해 수 호선 너머의 위험을 읽어낸다. 목숨과 직결된 대가를 지불하면 추적자를 교란할 가짜 소음 트랩이나 임시 도피처를 알려준다.',
    color: 'text-blue-500',
    borderColor: 'border-blue-900/50',
    bgColor: 'bg-blue-950/30'
  },
  {
    name: '퍼슈어 (Pursuers)',
    symbol: Package,
    territory: '외곽 폐쇄 구역 및 순환선 주변',
    description: '아무도 접근하길 꺼리는 깊은 외곽의 버려진 구역은 물론, 오염된 지상까지 올라가 낡은 기계 부품이나 희귀 자재들을 긁어모아 다른 세력들에게 공급하는 밀수꾼 집단. 끔찍한 위험이 도사리는 외곽과 지상을 오가는 특성 탓에 이들의 동체 시력과 달리기 속도는 인간의 한계를 초월했다. 하지만 귀한 물자가 발견되면 오직 혼자 살아남기 위해 동료의 다리를 다치게 하여 처참한 미끼로 던져버리는 극악무도한 잔혹함도 지녔다.',
    color: 'text-purple-500',
    borderColor: 'border-purple-900/50',
    bgColor: 'bg-purple-950/30'
  }
];

function FactionsPage() {
  const [activeFaction, setActiveFaction] = useState<typeof FACTIONS_DATA[0] | null>(null);

  // Esc key closure
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveFaction(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto pt-16 px-6 pb-24 h-full relative z-10 flex flex-col items-center">
        <PageHeader title="세력 (Factions)" subtitle="권력을 쥔 자들과 반역하는 자들의 혈투" icon={ShieldAlert} />
        
        <div className="flex-1 w-full flex items-center justify-center min-h-[50vh] mt-8">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
            {FACTIONS_DATA.map((faction, idx) => (
              <motion.button
                key={faction.name}
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFaction(faction)}
                className={cn("relative group p-8 md:p-10 rounded-full border flex items-center justify-center transition-all duration-300 focus:outline-none shadow-xl hover:border-opacity-100", faction.bgColor, faction.borderColor)}
              >
                {/* Glow layer */}
                <div className={cn("absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500", faction.bgColor.replace('/30', ''))} />
                
                {/* Pulse ring on hover */}
                <div className={cn("absolute inset-[-15px] rounded-full border scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500", faction.borderColor)} />
                
                <faction.symbol className={cn("w-12 h-12 md:w-16 md:h-16 transition-colors duration-300 relative z-10 group-hover:text-white", faction.color)} />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeFaction && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
              onClick={() => setActiveFaction(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0, transition: { duration: 0.2 } }}
              className={cn("relative w-full max-w-2xl border p-8 md:p-10 shadow-2xl overflow-hidden", activeFaction.borderColor, activeFaction.bgColor.replace('/30', '/10'))}
              onClick={e => e.stopPropagation()}
            >
              <div className={cn("absolute inset-0 opacity-10 blur-[100px] pointer-events-none", activeFaction.bgColor.replace('/30', ''))} />

              <div className="absolute -right-16 -bottom-16 opacity-[0.05] pointer-events-none">
                <activeFaction.symbol className={cn("w-96 h-96", activeFaction.color)} />
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8 relative z-10">
                <div className={cn("p-4 border shrink-0 bg-zinc-950/80 rounded-sm", activeFaction.borderColor)}>
                  <activeFaction.symbol className={cn("w-12 h-12", activeFaction.color)} />
                </div>
                <div className="pt-2">
                  <h3 className="text-3xl font-bold text-white font-sans tracking-tight mb-3">{activeFaction.name}</h3>
                  <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 border rounded-sm text-sm font-sans text-zinc-300 shadow-inner", activeFaction.borderColor, activeFaction.bgColor.replace('/30', '/40'))}>
                    <MapPin className="w-4 h-4" />
                    {activeFaction.territory}
                  </div>
                </div>
              </div>

              <div className={cn("relative z-10 border p-6 rounded-sm shadow-md", activeFaction.bgColor.replace('/30', '/20'), activeFaction.borderColor)}>
                <div className={cn("text-[10px] font-mono tracking-widest uppercase mb-4 flex items-center gap-2", activeFaction.color)}>
                  <ScanLine className="w-3.5 h-3.5" />
                  <span className="opacity-80">Faction Intel [Classified]</span>
                  <div className="flex-1 h-px ml-2 opacity-30" style={{ backgroundColor: 'currentColor' }} />
                </div>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans break-keep">
                  {activeFaction.description}
                </p>
              </div>

              {/* Close Button */}
              <button 
                onClick={() => setActiveFaction(null)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white p-2 transition-colors focus:outline-none z-30"
              >
                <span className="sr-only">Close</span>
                <div className="w-5 h-[2px] bg-current rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-5 h-[2px] bg-current -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const RADAR_RINGS = [100, 180, 260, 340, 420];

const METRO_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', 
  '#84cc16', '#22c55e', '#10b981', '#14b8a6', 
  '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', 
  '#d946ef', '#f43f5e'
];

const STATION_TYPES = [
  { type: '빈터 역', detail: '제일 흔히 싸움이 일어나는곳. 엄폐물이 가득하다.', symbol: '⊙' },
  { type: '광장 역', detail: '굉장히 넓음. 엄폐물이 없이 탁 트여있으며 물자가 많음. 그러나 위험도 많음.', symbol: '◎' },
  { type: '상점 역', detail: '조그만한 역. 정체 의문의 상인이 있으며 화폐를 대가로 물자를 교환함.', symbol: '$' },
  { type: '기둥 역', detail: '거대한 기둥이 중심에 있는 역.', symbol: '§' },
  { type: '밀폐 역', detail: '다른 역보다 작은 역.', symbol: '□' },
  { type: '폐철 역', detail: '고철이 가득한 역. 대부분 판매 가치는 떨어지나 제작에는 문제가 없음.', symbol: '※' }
];

const METRO_LINES = Array.from({ length: 14 }).map((_, i) => {
  const lineNum = i + 1;
  const angle = ((i * 360) / 14) * (Math.PI / 180);
  const numStations = (i % 6) + 5; // 5~10
  const color = METRO_COLORS[i];
  
  const stations = Array.from({ length: numStations }).map((_, j) => {
    const radSteps = 300 / numStations;
    // adding some wobble so the line isn't perfectly straight
    const radius = 60 + j * radSteps + ((i * j) % 15); 
    const curveAngle = angle + (Math.sin(j) * 0.1);
    
    // 나선 모양으로 폐쇄된 구역 배치 (i: 각도, j: 반지름)
    const isAbandoned = (i * 2 - j * 3 + 42) % 14 < 2;
    
    let typeIndex = (i * 11 + j * 31) % STATION_TYPES.length;
    // 상점 역 (index 2)은 홀수 구역(1, 3, 5 등)에만 등장 가능. j+1이 짝수이면 다른 역으로 변경.
    if (typeIndex === 2 && (j + 1) % 2 === 0) {
      typeIndex = (typeIndex + 1) % STATION_TYPES.length;
    }
    
    // 1호선, 7호선, 11호선이 아닌 곳의 상점 역(2)은 빈터 역(0)으로 변경.
    if (typeIndex === 2 && ![1, 7, 11].includes(lineNum)) {
      typeIndex = 0;
    }
    
    // 11호선 제1구역은 빈터 역으로 교체
    if (lineNum === 11 && j === 0) {
      typeIndex = 0;
    }
    
    // 기둥 역(3)은 마지막 구역 한 칸 뒤(numStations - 2)에만 배치
    if (j === numStations - 2) {
      typeIndex = 3;
    } else if (typeIndex === 3) {
      // 그 외의 기둥 역은 빈터 역(0) 또는 폐철 역(5)으로 변경
      typeIndex = (i + j) % 2 === 0 ? 0 : 5;
    }

    const stationType = STATION_TYPES[typeIndex];
    
    return {
      id: `L${lineNum}-S${j+1}`,
      name: `${lineNum}호선 - 제${j+1}구역 [${stationType.type}]`,
      x: 400 + Math.cos(curveAngle) * radius,
      y: 400 + Math.sin(curveAngle) * radius,
      isAbandoned,
      status: isAbandoned ? '구역 폐쇄 (위험도: 극도)' : '탐색 가능 (주의 요망)',
      detailInfo: stationType.detail,
      symbol: stationType.symbol
    };
  });

  return {
    id: lineNum,
    name: `제${lineNum}호선`,
    color,
    stations,
    pathData: `M 400 400 ` + stations.map(s => `L ${s.x} ${s.y}`).join(' ')
  };
});

const OUTER_RING_PATH = `M ${METRO_LINES[0].stations[METRO_LINES[0].stations.length - 1].x} ${METRO_LINES[0].stations[METRO_LINES[0].stations.length - 1].y} ` +
  METRO_LINES.slice(1).map(line => `L ${line.stations[line.stations.length - 1].x} ${line.stations[line.stations.length - 1].y}`).join(' ') + ' Z';

type VentRoute = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isOuterRing?: boolean;
  description: string;
};

const VENT_ROUTES: VentRoute[] = [];
METRO_LINES.forEach((line, i) => {
  const nextLine = METRO_LINES[(i + 1) % 14];
  const prevLine = METRO_LINES[(i + 13) % 14];
  
  line.stations.forEach((st, j) => {
    // 같은 호선 내 인접 역 연결
    if (j < line.stations.length - 1 && (i * 7 + j * 11) % 3 !== 0) {
      VENT_ROUTES.push({ 
        x1: st.x, y1: st.y, 
        x2: line.stations[j+1].x, y2: line.stations[j+1].y,
        description: `제 ${line.num}호선 구역을 잇는 직통 환풍망. 일직선으로 뻗어있어 이동은 빠르나, 내부가 좁아 기어가는 도중 발각되면 피할 곳이 없는 치명적 함정이 된다.`
      });
    }
    // 다음 호선과 연결
    if (j < nextLine.stations.length && (i * 13 + j * 17) % 4 === 0) {
      VENT_ROUTES.push({ 
        x1: st.x, y1: st.y, 
        x2: nextLine.stations[j].x, y2: nextLine.stations[j].y,
        description: `호선과 호선 사이를 가로지르는 불규칙한 횡단 배관. 붕괴 위험이 있으며, 교차 지점에 고인 습기 탓에 미끄러져 추락하거나 소음을 발생시키기 쉽다.`
      });
    }
    // 이전 호선의 이전 역과 나선형 연결
    if (j > 0 && j - 1 < prevLine.stations.length && (i * 3 + j * 19) % 9 === 0) {
      VENT_ROUTES.push({ 
        x1: st.x, y1: st.y, 
        x2: prevLine.stations[j-1].x, y2: prevLine.stations[j-1].y,
        description: `숨겨진 낡은 환기통. 사냥개들의 기본 수색망에서는 벗어나 있지만, 한 번 들어가면 방향 감각을 상실할 정도로 내부 구조가 복잡하게 얽혀있다.`
      });
    }

    // 외곽 순환선 환풍망 (가장 외곽 역들 연결)
    if (j === line.stations.length - 1) {
      const nextOuterSt = nextLine.stations[nextLine.stations.length - 1];
      // 중복 방지를 위해 외곽선은 전체를 한 바퀴 연결
      VENT_ROUTES.push({
        x1: st.x, y1: st.y,
        x2: nextOuterSt.x, y2: nextOuterSt.y,
        isOuterRing: true,
        description: `외곽 순환 구역을 따라 흐르는 거대 폐쇄 환풍로. 포자 감염 위험이 극치에 달해 추적자조차 접근을 꺼리나, 퍼슈어(Pursuers)들의 은밀한 주 이동 경로로 쓰인다.`
      });
    }
  });
});

function LocationsPage() {
  const [hoveredNode, setHoveredNode] = useState<{name: string, desc: string, status: string} | null>(null);
  const [viewMode, setViewMode] = useState<'lines' | 'vents'>('lines');

  const activeInfo = hoveredNode || {
    name: '종착역 (Terminus)',
    desc: '모든 호선이 교차하는 최후의 생존 구역. 지하의 중앙 심장부이자 마지막 요새. 철저한 통제 아래 빛이 아직 남아있다.',
    status: 'SYSTEM_CORE_SECURE'
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-7xl mx-auto pt-16 px-6 pb-24 flex flex-col h-full">
      <PageHeader title="장소 (호선)" subtitle="지옥의 핏줄이 된 14개의 궤도" icon={TrainFront} />
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Map Container */}
        <div className="flex-1 rounded-xl border border-zinc-800 bg-[#0c0c0c] relative overflow-hidden shadow-2xl shadow-black/50 aspect-square md:aspect-auto min-h-[500px]">
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-20"></div>
          
          <div className="absolute top-4 left-4 z-30 flex flex-col gap-4">
            {/* Toggle Mode */}
            <div className="flex bg-[#0a0a0a]/80 border border-zinc-800 rounded-lg overflow-hidden shrink-0 backdrop-blur-sm shadow-xl w-fit">
               <button 
                 className={cn("px-4 py-2 text-xs font-mono tracking-widest transition-colors", viewMode === 'lines' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300')} 
                 onClick={() => setViewMode('lines')}
               >
                 호선
               </button>
               <button 
                 className={cn("px-4 py-2 text-xs font-mono tracking-widest transition-colors border-l border-zinc-800", viewMode === 'vents' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300')} 
                 onClick={() => setViewMode('vents')}
               >
                 환풍구
               </button>
            </div>

            <AnimatePresence>
              {viewMode === 'lines' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-[#0a0a0a]/80 border border-zinc-800 p-3 rounded-lg text-xs font-mono backdrop-blur-sm shadow-xl w-fit overflow-hidden"
                >
                  <h4 className="text-zinc-500 mb-2 border-b border-zinc-800 pb-1 tracking-widest uppercase pointer-events-none">Icon Legend</h4>
                  <div className="flex flex-col gap-1.5">
                    {STATION_TYPES.map(st => (
                      <div 
                        key={st.type} 
                        className="flex items-center gap-3 cursor-help hover:bg-zinc-800/80 p-1 -mx-1 rounded transition-colors"
                        onMouseEnter={() => setHoveredNode({
                          name: `${st.symbol} ${st.type}`,
                          desc: st.detail,
                          status: '기호 안내 (Legend)'
                        })}
                        onMouseLeave={() => setHoveredNode(null)}
                      >
                        <span className="text-amber-500 font-bold w-4 text-center pointer-events-none">{st.symbol}</span>
                        <span className="text-zinc-400 pointer-events-none">{st.type}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <svg viewBox="0 0 800 800" className="w-full h-full bg-[#0c0c0c]">
            <defs>
              <style>{`
                @keyframes vent-flow {
                  to { stroke-dashoffset: -20; }
                }
                .vent-duct {
                  stroke-dasharray: 8 6;
                  animation: vent-flow 15s linear infinite;
                }
              `}</style>
            </defs>

            <g className={cn("transition-all duration-700", viewMode === 'vents' ? 'opacity-20 grayscale blur-[2px] pointer-events-none' : 'opacity-100')}>
              {/* Background Rings */}
              {RADAR_RINGS.map(r => (
                <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="#27272a" strokeWidth="1" strokeDasharray="4 4" className="pointer-events-none" />
              ))}
            
            {/* Axis Lines */}
            <g className="pointer-events-none opacity-50">
              <line x1="400" y1="0" x2="400" y2="800" stroke="#27272a" strokeWidth="1" />
              <line x1="0" y1="400" x2="800" y2="400" stroke="#27272a" strokeWidth="1" />
            </g>

            {/* Outer Ring Line */}
            <g className="group/outer-ring">
              <path 
                d={OUTER_RING_PATH} 
                fill="none" 
                stroke="transparent" 
                strokeWidth="20"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode({ name: '외곽 순환선', desc: '모든 노선의 종착 구역들을 잇는 거대한 외곽 순환 경로. 접근이 엄격히 통제된 무법지대.', status: '경계 구역 (미확인 위험)' })}
                onMouseLeave={() => setHoveredNode(null)}
              />
              <path 
                d={OUTER_RING_PATH} 
                fill="none" 
                stroke="#666" 
                strokeWidth="2" 
                strokeDasharray="8 6"
                className="opacity-50 pointer-events-none group-hover/outer-ring:stroke-red-500 group-hover/outer-ring:opacity-100 transition-colors duration-500"
              />
            </g>

            {/* Metro Lines */}
            {METRO_LINES.map(line => (
               <g key={line.id} className="group/line">
                 <path 
                   d={line.pathData} 
                   fill="none" 
                   stroke="transparent" 
                   strokeWidth="20" 
                   className="cursor-pointer"
                   onMouseEnter={() => setHoveredNode({ name: line.name, desc: `중심부에서 외곽으로 이어지는 노선. 총 ${line.stations.length}개의 주요 거점이 확인됨.`, status: '경로 스캔 완료' })}
                   onMouseLeave={() => setHoveredNode(null)}
                 />
                 <path 
                   d={line.pathData} 
                   fill="none" 
                   stroke={line.color} 
                   strokeWidth="3" 
                   className="opacity-40 pointer-events-none group-hover/line:opacity-100 transition-opacity"
                 />
                 {line.stations.map((st) => (
                   <g 
                    key={st.id} 
                    className="cursor-crosshair transition-transform origin-center hover:scale-150"
                    style={{ transformOrigin: `${st.x}px ${st.y}px` }}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setHoveredNode({
                        name: st.name,
                        desc: `${st.detailInfo}\n\n${st.isAbandoned ? '방사능 및 정체불명의 개체 출몰로 인해 폐쇄된 지하 구역. 접근 금지령 발동 중.' : '거주민이 일부 남아있거나 임시 보급이 가능한 탐색 기지. 언제든 위협에 노출될 수 있음.'}`,
                        status: st.status
                      });
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setHoveredNode(null);
                    }}
                   >
                     <circle
                       cx={st.x}
                       cy={st.y}
                       r="8"
                       fill="#0c0c0c"
                       stroke={st.isAbandoned ? '#ef4444' : '#27272a'}
                       strokeWidth="1"
                     />
                     <text
                       x={st.x}
                       y={st.y}
                       fill={st.isAbandoned ? '#ef4444' : line.color}
                       fontSize={st.symbol === '◎' ? "14" : "11"}
                       textAnchor="middle"
                       dominantBaseline="central"
                       className="font-bold pointer-events-none opacity-80 group-hover/line:opacity-100"
                     >
                       {st.symbol}
                     </text>
                   </g>
                 ))}
               </g>
            ))}

            {/* Terminus (Center) */}
            <g 
              className={cn("cursor-pointer", viewMode === 'lines' ? 'pointer-events-auto' : 'pointer-events-none')}
              onMouseEnter={() => setHoveredNode(null)}
            >
              <circle cx="400" cy="400" r="16" fill="#09090b" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
              <circle cx="400" cy="400" r="6" fill="#ef4444" />
              <text x="424" y="405" fill="#ef4444" className="font-mono text-[14px] tracking-widest font-bold filter drop-shadow opacity-90 pointer-events-none">종착역</text>
              <text x="424" y="420" fill="#a1a1aa" className="font-mono text-[10px] tracking-widest pointer-events-none">TERMINUS_00</text>
            </g>
            </g>

            {/* Ventilation Shafts Layer */}
            <g className={cn("transition-all duration-700", viewMode === 'vents' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
              {VENT_ROUTES.map((route, i) => (
                <g 
                  key={`vent-group-${i}`}
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoveredNode({
                    name: route.isOuterRing ? "순환로 폐쇄 환기망" : "내부 환풍 경로",
                    desc: route.description,
                    status: route.isOuterRing ? "EXTREME DANGER" : "CRITICAL PATH"
                  })}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Invisible thicker line for easier hovering */}
                  <line 
                    x1={route.x1} y1={route.y1} 
                    x2={route.x2} y2={route.y2} 
                    stroke="transparent" 
                    strokeWidth="12" 
                  />
                  <line 
                    x1={route.x1} y1={route.y1} 
                    x2={route.x2} y2={route.y2} 
                    stroke={route.isOuterRing ? "#ef4444" : "#8b5cf6"} 
                    strokeWidth="2" 
                    className={cn("vent-duct transition-all duration-300 hover:opacity-100", route.isOuterRing ? "opacity-90 stroke-[3px]" : "opacity-60")} 
                    style={{ filter: route.isOuterRing ? 'drop-shadow(0 0 8px rgba(239,68,68,0.9))' : 'drop-shadow(0 0 6px rgba(139,92,246,0.8))' }}
                  />
                </g>
              ))}
              {METRO_LINES.map(line => line.stations.map(st => (
                <circle 
                  key={`vent-node-${st.id}`}
                  cx={st.x} cy={st.y}
                  r="3.5"
                  fill="#c4b5fd"
                  className="opacity-90 drop-shadow-[0_0_8px_rgba(139,92,246,1)] pointer-events-none"
                />
              )))}
            </g>
          </svg>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          <div className="border border-zinc-800 bg-[#141414] p-6 rounded-xl flex flex-col h-full min-h-[320px] shadow-2xl">
            <div className="mb-6 text-xs font-mono text-amber-500 tracking-widest border-b border-zinc-800 pb-3 flex justify-between">
              <span>SCAN_TARGET</span>
              <span className={hoveredNode ? 'text-amber-500' : 'text-zinc-500'}>[{hoveredNode ? 'ACQUIRED' : 'DEFAULT'}]</span>
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-3 tracking-tight font-sans">{activeInfo.name}</h3>
            <div className="flex-1">
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-sans break-keep whitespace-pre-wrap">
                {activeInfo.desc}
              </p>
            </div>

            <div className={`mt-auto border border-zinc-800 p-4 rounded-lg flex items-center gap-3 transition-colors ${activeInfo.status.includes('폐쇄') ? 'bg-red-950/20 border-red-900/30' : 'bg-[#0a0a0a]'}`}>
              <div className={`w-2 h-2 rounded-full ${activeInfo.status.includes('폐쇄') ? 'bg-red-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
              <span className={`text-xs font-mono tracking-wider ${activeInfo.status.includes('폐쇄') ? 'text-red-400' : 'text-emerald-400'}`}>
                {activeInfo.status}
              </span>
            </div>
          </div>

          <div className="border border-zinc-800 bg-zinc-900/50 p-4 rounded-xl flex items-center justify-center">
            <ScanLine className="w-4 h-4 text-zinc-500 mr-2 animate-pulse" />
            <span className="text-xs font-mono text-zinc-500">지도의 요소에 마우스를 올려 정보 확인</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// --- Main Navigation Component ---

const menus = [
  {
    id: 'characters',
    title: '등장인물',
    subtitle: '01_BIOS',
    path: '/characters',
    icon: Users,
    colSpan: 'md:col-span-7 md:row-span-1',
    desc: '어둠 속에 숨어든 자들과 그들의 궤적',
    thumbnailContent: (
      <>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
           <div className="w-32 h-32 border-2 border-dashed border-zinc-700 rounded-full flex items-center justify-center opacity-40">
             <div className="w-24 h-24 border border-zinc-800/50 bg-[#1a1a1a] rounded-full"></div>
           </div>
        </div>
        <div className="absolute top-4 right-4 z-20 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">ENTRY_COUNT: 142</div>
      </>
    )
  },
  {
    id: 'terminology',
    title: '용어',
    subtitle: '02_LEXICON',
    path: '/terminology',
    icon: Book,
    colSpan: 'md:col-span-5 md:row-span-1',
    desc: '지하의 규칙을 담은 낡은 기록들',
    thumbnailContent: (
      <div className="absolute inset-0 bg-zinc-900 flex flex-col p-6 transition-colors duration-500 group-hover:bg-[#1a1a1a]">
        <div className="space-y-2 opacity-20">
          <div className="h-2 w-full bg-zinc-700"></div>
          <div className="h-2 w-3/4 bg-zinc-700"></div>
          <div className="h-2 w-1/2 bg-zinc-700"></div>
        </div>
      </div>
    )
  },
  {
    id: 'factions',
    title: '세력',
    subtitle: '03_POWER',
    path: '/factions',
    icon: ShieldAlert,
    colSpan: 'md:col-span-4 md:row-span-1',
    desc: '구역을 지배하는 위협적인 힘의 균형',
    thumbnailContent: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10 transition-transform duration-700 group-hover:rotate-45 group-hover:opacity-20 group-hover:scale-110">
        <div className="w-32 h-32 border-4 border-zinc-700 rotate-45"></div>
      </div>
    )
  },
  {
    id: 'locations',
    title: '장소 (호선)',
    subtitle: '04_STATIONS',
    path: '/locations',
    icon: TrainFront,
    colSpan: 'md:col-span-8 md:row-span-1',
    desc: '빛이 닿지 않는 깊고 위험한 선로들',
    thumbnailContent: (
      <>
        <div className="absolute inset-0 bg-zinc-900 transition-transform duration-700 group-hover:scale-105">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute top-1/2 left-1/4 w-3/4 h-[2px] bg-red-900/30 -rotate-12"></div>
          <div className="absolute top-1/3 left-1/3 w-1/2 h-[2px] bg-red-900/40 rotate-45"></div>
        </div>
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
          <div className="w-3 h-3 bg-zinc-600 rounded-full"></div>
        </div>
      </>
    )
  }
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col p-6 md:p-8 lg:p-12 relative overflow-hidden bg-[#0c0c0c] text-[#d4d4d8] font-mono mx-auto max-w-7xl">
      
      {/* Background Gritty Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
      {/* Visual Accents */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/5 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-900/5 blur-[100px] rounded-full -ml-32 -mb-32 pointer-events-none"></div>

      {/* Top Navigation / System Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between items-start mb-8 z-10 border-b border-zinc-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-red-500">METRO_SYSTEM // ARCHIVE</h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Protocol: Post-Apocalyptic Noir / Thriller Database</p>
        </div>
        <div className="sm:text-right flex flex-row sm:flex-col justify-between w-full sm:w-auto">
          <div className="text-xs text-zinc-500">SCAN_DATE: 2033.12.04</div>
          <div className="text-xs text-red-600/70 animate-pulse uppercase">Radiation Level: Warning</div>
        </div>
      </header>

      {/* Main Content: Bento Navigation Grid */}
      <main className="flex-1 flex flex-col items-center justify-center w-full z-10 my-8">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="mb-8 opacity-90 hidden sm:block"
          >
            <h2 
              className="text-4xl md:text-5xl font-black tracking-tighter uppercase font-sans text-white mb-2 glitch-hover select-none"
              data-text="Project Metro-Noir"
            >
              Project Metro-Noir
            </h2>
            <p className="text-zinc-400 font-light tracking-wide text-sm max-w-lg font-sans">
              우리가 아는 지옥은 전부 땅 아래에 있었다. 우리가 아는 지옥은 이제 땅 위에 있다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 w-full h-full sm:min-h-[540px]">
            <AnimatePresence>
              {menus.map((menu, i) => (
                <motion.div
                  key={menu.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
                  className={cn("h-full min-h-[280px]", menu.colSpan)}
                >
                  <Link to={menu.path} className="block group h-full">
                    <div className="relative w-full h-full overflow-hidden border border-zinc-800 bg-[#141414] hover:border-red-500/50 transition-colors cursor-pointer flex flex-col">
                      
                      {/* Thumbnail / Visual Patterns */}
                      {menu.thumbnailContent}
                      
                      {/* Text Content */}
                      <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent pt-12">
                        <span className="text-[10px] text-red-600 font-bold tracking-widest uppercase mb-1 block">{menu.subtitle}</span>
                        <div className="flex items-center gap-3 mb-1">
                          <menu.icon className="w-6 h-6 text-zinc-300 group-hover:text-red-500 transition-colors" strokeWidth={2} />
                          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans">{menu.title}</h2>
                        </div>
                        <p className="text-xs text-zinc-400 uppercase font-sans tracking-wide">
                          {menu.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Bottom Bar / Status UI */}
      <footer className="mt-auto flex flex-col sm:flex-row justify-between items-center text-[10px] tracking-widest text-zinc-600 border-t border-zinc-800 pt-4 z-10 gap-4 sm:gap-0">
        <div className="flex gap-6 uppercase w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span>Archive Loaded</span>
          </div>
          <span className="hidden sm:inline">Connection: Low-Fi Signal</span>
        </div>
        <div className="uppercase text-red-600/50 text-center sm:text-right flex-1 sm:flex-none">
          UNAUTHORIZED ACCESS PROHIBITED // SEARCHING FOR TRACE...
        </div>
      </footer>

    </div>
  );
}

// --- App Shell ---

function AppContent() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/terminology" element={<TerminologyPage />} />
        <Route path="/factions" element={<FactionsPage />} />
        <Route path="/locations" element={<LocationsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0%,rgba(0,0,0,1)_80%)]" />

      {/* Glitchy Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, scale: 1, letterSpacing: '0.3em' }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          METRO_HELL
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-zinc-500 font-mono text-sm mt-4 uppercase tracking-widest text-center"
        >
          Initializing sub-systems...
        </motion.p>
      </motion.div>

      {/* Loading Bar */}
      <div className="absolute bottom-0 left-0 w-full z-10 flex flex-col">
        <div className="flex justify-between items-center px-6 pb-2 font-mono text-[10px] sm:text-xs text-zinc-600 uppercase tracking-widest">
           <span>System Boot</span>
           <span>{Math.floor(progress)}%</span>
        </div>
        <div className="w-full h-1 bg-zinc-900 overflow-hidden">
          <motion.div 
            className="h-full bg-red-600 shadow-[0_0_10px_rgba(239,68,68,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3 seconds loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      <div className="min-h-screen bg-neutral-950 text-neutral-300 font-sans selection:bg-red-500/30 selection:text-red-200">
        {/* Global vignette effect for Noir feel */}
        <div className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-80" />
        
        {/* Main Content */}
        <div className="relative z-0">
          <AppContent />
        </div>
      </div>
    </BrowserRouter>
  );
}
