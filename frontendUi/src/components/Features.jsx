import React from 'react';

const Features = () => {
  return (
    <section id="features">
      {/* Flex Container */}
      <div className="container mx-auto flex flex-col lg:flex-row items-start justify-center gap-2 py-28 px-8 md:px-0">
        {/* What's Different */}
        <div className="w-full flex flex-col space-y-12 md:w-1/2">
          <h2 className="text-4xl font-bold text-center leading-tight">
            What's different about Chatter?
          </h2>
          <p className="w-full mx-auto max-w-lg text-darkGrayishBlue text-left leading-relaxed break-words px-4 ">
            Chatter provides all the communication tools you need to stay
            connected, without the complexity. Our platform is designed for
            seamless, secure, and easy messaging for everyone.
          </p>
        </div>

        {/* Numbered List */}
        <div className="flex flex-col space-y-8 md:w-1/2">
          {/* List Item 1 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-brightPurple">
                  01
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Real-time Messaging
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Real-time Messaging
              </h3>
              <p className="text-darkGrayishBlue">
                Chat with anyone instantly with real-time messaging, whether for
                personal or professional use. Stay updated with every
                conversation, no matter where you are.
              </p>
            </div>
          </div>

          {/* List Item 2 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-brightPurple">
                  02
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Secure Conversations
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Secure Conversations
              </h3>
              <p className="text-darkGrayishBlue">
                With end-to-end encryption, Chatter ensures your messages remain
                private. Your conversations are only visible to you and the
                people you're communicating with.
              </p>
            </div>
          </div>

          {/* List Item 3 */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            {/* Heading */}
            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-brightPurple">
                  03
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  All-in-One Platform
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                All-in-One Platform
              </h3>
              <p className="text-darkGrayishBlue">
                No need for multiple apps. With Chatter, you can chat, share
                files, and organize conversations—all in one place, keeping
                everything simple and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
