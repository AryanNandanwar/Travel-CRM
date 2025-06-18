

import FollowUp from '../components/FollowUps';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const FollowUpPage = () => {
  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1">
      <Topbar />

              <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}

                  <div className="p-4 space-y-4">
                    <FollowUp/>
                  </div>
              </div>

          </div>
    </div>

 );
};

export default FollowUpPage
