require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RCTACPTarget"
  s.version      = package["version"]
  s.summary      = "Target library for Adobe Experience Cloud SDK. Written and Supported by Adobe."
  s.author       = "Adobe Mobile SDK Team"

  s.homepage     = "https://github.com/adobe/react-native-acptarget"

  s.license      = "Apache 2.0 License"
  s.platform      = :ios, '10.0'

  s.source       = { :git => "https://github.com/adobe/react-native-acptarget.git", :tag => "#{s.version}" }

  s.source_files  = "ios/**/*.{h,m}"
  s.requires_arc = true

  s.dependency "React"
  s.dependency "ACPTarget"
end
