import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import OutCalls "http-outcalls/outcall";
import AccessControl "authorization/access-control";

actor {
  type Message = {
    id : Nat;
    sender : Text;
    content : Text;
    language : Text;
  };

  type Chat = {
    messages : [Message];
  };

  public type UserProfile = {
    name : Text;
  };

  type Video = {
    title : Text;
    description : Text;
    url : Text;
    thumbnail : Text;
    category : Text;
  };

  type VideoCategory = {
    name : Text;
    videos : [Video];
  };

  let accessControlState = AccessControl.initState();
  let chats = Map.empty<Principal, Chat>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let videoCategories = Map.empty<Text, VideoCategory>();
  var nextMessageId = 0;
  var nextVideoId = 0;

  func compareTrends(trend1 : Text, trend2 : Text) : Order.Order {
    Text.compare(trend1, trend2);
  };

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  func isValidMessageContent(content : Text) : Bool {
    content.size() > 0 and content.size() <= 1000;
  };

  public shared ({ caller }) func sendMessage(content : Text, language : Text) : async Message {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send messages");
    };

    if (not isValidMessageContent(content)) {
      Runtime.trap("Invalid message content");
    };

    let message = {
      id = nextMessageId;
      sender = caller.toText();
      content;
      language;
    };

    let userMessages = switch (chats.get(caller)) {
      case (null) { [] };
      case (?chat) { chat.messages };
    };
    let newMessages = userMessages.concat([message]);
    chats.add(caller, { messages = newMessages });

    nextMessageId += 1;
    message;
  };

  public shared ({ caller }) func sendSwahiliMessage(content : Text) : async Message {
    await sendMessage(content, "Swahili");
  };

  public shared ({ caller }) func sendEnglishMessage(content : Text) : async Message {
    await sendMessage(content, "English");
  };

  public shared ({ caller }) func sendMarketQuery(content : Text) : async Message {
    await sendMessage(content, "EN");
  };

  public query ({ caller }) func getRecentMessages(user : Principal, count : Nat) : async [Message] {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own messages");
    };

    switch (chats.get(user)) {
      case (null) { [] };
      case (?chat) {
        let messages = chat.messages.values().take(count).toArray();
        messages;
      };
    };
  };

  func sortMarketTrendsByPopularity(trends : Text) : Text {
    let trendArray = [trends];
    let sorted = trendArray.sort(compareTrends);
    sorted[0];
  };

  public shared ({ caller }) func fetchMarketData() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access market data");
    };

    let marketApiUrl = "https://api.syvit.kyaani.com/realmarkets/marketdata";
    await OutCalls.httpGetRequest(marketApiUrl, [], transform);
  };

  public query func transform(input : OutCalls.TransformationInput) : async OutCalls.TransformationOutput {
    OutCalls.transform(input);
  };

  public shared ({ caller }) func addVideoCategory(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add video categories");
    };
    if (videoCategories.containsKey(name)) {
      Runtime.trap("Video category already exists");
    };
    let category : VideoCategory = {
      name;
      videos = [];
    };
    videoCategories.add(name, category);
  };

  public shared ({ caller }) func addVideo(video : Video) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add videos");
    };

    switch (videoCategories.get(video.category)) {
      case (null) { Runtime.trap("Video category does not exist") };
      case (?category) {
        let updatedCategory = {
          category with videos = category.videos.concat([video]);
        };
        videoCategories.add(video.category, updatedCategory);
      };
    };
  };

  public query func getAllVideoCategories() : async [VideoCategory] {
    videoCategories.values().toArray();
  };

  public query func getVideosByCategory(categoryName : Text) : async ?[Video] {
    switch (videoCategories.get(categoryName)) {
      case (null) { null };
      case (?category) { ?category.videos };
    };
  };

  public query func getVideoCategory(categoryName : Text) : async ?VideoCategory {
    videoCategories.get(categoryName);
  };

  public shared ({ caller }) func updateVideoThumbnail(categoryName : Text, videoTitle : Text, newThumbnail : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update video thumbnails");
    };

    switch (videoCategories.get(categoryName)) {
      case (null) { Runtime.trap("Video category does not exist") };
      case (?category) {
        let updatedVideos = category.videos.map(
          func(video) {
            if (video.title == videoTitle) {
              { video with thumbnail = newThumbnail };
            } else {
              video;
            };
          }
        );
        let updatedCategory = {
          category with videos = updatedVideos;
        };
        videoCategories.add(categoryName, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func fetchBusinessTEDVideos() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch business TED videos");
    };

    let apiKey = "YOUR_YOUTUBE_API_KEY";
    let tedChannelId = "UCsT0YIqwnpJCM-mx7-gSA4Q";
    let baseUrl = "https://www.googleapis.com/youtube/v3/search";
    let searchQuery = "business strategies leadership innovation";
    let videoCategoryId = "27";

    let apiUrl = baseUrl # "?part=snippet&q=" # searchQuery # "&type=video&videoCategoryId=" # videoCategoryId # "&order=relevance&maxResults=20" # "&channelId=" # tedChannelId # "&key=" # apiKey;

    await OutCalls.httpGetRequest(apiUrl, [], transform);
  };

  public shared ({ caller }) func fetchAllPublicTEDVideos() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can fetch public TED videos");
    };

    let apiKey = "YOUR_YOUTUBE_API_KEY";
    let tedChannelId = "UCsT0YIqwnpJCM-mx7-gSA4Q";
    let baseUrl = "https://www.googleapis.com/youtube/v3/search";
    let maxResults = "20";
    let videoCategoryId = "27";

    let apiUrl = baseUrl # "?part=snippet&type=video&videoCategoryId=" # videoCategoryId # "&order=relevance&maxResults=" # maxResults # "&channelId=" # tedChannelId # "&key=" # apiKey;

    await OutCalls.httpGetRequest(apiUrl, [], transform);
  };

  // USSD Functionality for Demo (Stubbed/Simulated Response)
  // This provides a simulated USSD response for demo purposes until a real telecom USSD gateway is available.
  public shared ({ caller }) func sendUSSDRequest(_code : Text, _service : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can send USSD requests");
    };

    // Simulated response - real integration will replace this
    "USSD request sent successfully. You will receive a response shortly.";
  };
};
