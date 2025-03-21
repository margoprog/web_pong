#pragma once

#include <iostream>
 #include <map> 
 #include <vector> 

 #include "ATarget.hpp"




 class TargetGenerator {


        private:
        std::vector<ATarget*> arr;

        
        TargetGenerator&operator=( const TargetGenerator &other);
        TargetGenerator(const TargetGenerator &other);
       

        public:
        ~TargetGenerator();
        TargetGenerator();

        void learnTargetType( ATarget* ref);
        void forgetTargetType(const std::string & target);
        ATarget* createTarget(const std::string & target);

 };
 
//  int main()
//  {
//    TargetGenerator richard("Richard", "the Titled");
 
//    Dummy bob;
//    Fwoosh* fwoosh = new Fwoosh();
 
//    richard.learnTarget(fwoosh);
 
//    richard.introduce();
//    richard.launchTarget("Fwoosh", bob);
 
//     richard.forgetTarget("Fwoosh");
//    richard.launchTarget("Fwoosh", bob);
//  }
 