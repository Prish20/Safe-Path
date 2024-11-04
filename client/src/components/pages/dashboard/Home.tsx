import SectionHeader from "@/components/common/SectionHeader";
import { quickShortcuts } from "../constants";
import QuickLink from "../constants/QuickLink";
import Separator from "@/components/common/Separator";
import DashboardHeader from "@/components/common/DashboardHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllIncidents } from "@/user/userThunks";
import { AppDispatch } from "@/redux/store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const { incidents, loading, error } = useSelector((state: RootState) => state.incidents);

  useEffect(() => {
    dispatch(getAllIncidents());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 flex flex-row w-full h-full justify-center overflow-hidden">
      <div className="bg-gray-800 w-full justify-center overflow-hidden rounded-lg m-2">
        <div className="scrollbar-thin h-full w-full p-4 sm:p-8">
          <DashboardHeader username={`${user?.firstName ?? ""}`} />
          <Separator className="bg-green-500" />
          {/* Shortcut to Other Sections */}
          <SectionHeader title="Quick Shortcuts" />
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {quickShortcuts.map((item, index) => (
              <QuickLink
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                route={item.route}
              />
            ))}
          </section>
          <div>
            {/* Recent Incidents */}
            <SectionHeader title="Recent Incidents" />
            <div className="p-4">
              {loading ? (
                <div className="flex justify-center">
                  <p className="text-gray-400 animate-pulse">Loading incidents...</p>
                </div>
              ) : error ? (
                <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400">Error: {error}</p>
                </div>
              ) : incidents && incidents.length > 0 ? (
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {incidents.map((incident, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <div className="bg-emerald-800/30 rounded-lg p-4 mx-2 cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-emerald-500 text-lg font-medium">
                              {incident.type}
                            </h3>
                            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                              Status: {incident.status}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                            {incident.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-green-500">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {incident.location}
                            </div>
                            <span className="text-gray-500">
                              {new Date(incident.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-4 border-0 bg-green-800/50 hover:bg-emerald-500/50 text-green-500" />
                  <CarouselNext className="mr-4 border-0 bg-green-800/50 hover:bg-emerald-500/50 text-green-500" />
                </Carousel>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No incidents reported yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
