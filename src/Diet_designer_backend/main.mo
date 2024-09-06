import Nat "mo:base/Nat";
import List "mo:base/List";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Nat8 "mo:base/Nat8";
import Error "mo:base/Error";
import Random "mo:base/Random";
import Serde "mo:serde";
import Types "Types";
import Fuzz "mo:fuzz";



actor dietDesigner {



  type UserPreferences = {
    dietary_restrictions : Text;
    allergies : Text;
    favorite_foods : Text;
    disliked_foods : Text;
    mealPlan_purpose : Text;
    country : Text;
  };

  type NutritionalGoals = {
    caloric_intake : Nat;
  };

  type MealPlan = {
    day1: Text;
    day2: Text;
    day3: Text;
    day4: Text;
    day5: Text;
    day6: Text;
    day7: Text;
    // owner : Principal;
  };

  public type MealRequest = {
    meal_title : Text;
    user_preferences : UserPreferences;
    nutritional_goals : NutritionalGoals;
    owner : Principal;
  };

  public type MealResponse = {
    meal_title : Text;
    user_preferences : UserPreferences;
    nutritional_goals : NutritionalGoals;
  };

  public type AiMealResponse = {
    meal_title : Text;
    day1: Text;
    day2: Text;
    day3: Text;
    day4: Text;
    day5: Text;
    day6: Text;
    day7: Text;
  };

  type Response ={
    #plan : MealRequest;
    #ai_result : MealPlan;
    #message : Text;
    #error : Text;
  };

    // Maximum number of MealRequests per Principal
  // let MAX_MEAL_REQUESTS: Nat = 5;

  let maxUsers: Nat = 100;
  let maxMealPlan: Nat = 3;
  var storedPrincipals: HashMap.HashMap<Principal, [MealRequest]> = HashMap.HashMap<Principal, [MealRequest]>(0, Principal.equal, Principal.hash);
  var mealGeneration: HashMap.HashMap<Principal, [MealPlan]> = HashMap.HashMap<Principal, [MealPlan]>(0, Principal.equal, Principal.hash);



public func storePrincipal(principalId: Text): async ?([MealRequest], [MealPlan]) {
    let principal = Principal.fromText(principalId);

    // Check if the principal already exists in `storedPrincipals`
    let mealRequests = switch (storedPrincipals.get(principal)) {
        case (?plans) {
            // Principal already exists, retrieve their MealRequest data
            Debug.print("Principal already exists: " # Principal.toText(principal));
            plans;
        };
        case (null) {
            // Check if the maximum number of users has been reached
            if (storedPrincipals.size() >= maxUsers) {
                Debug.print("Maximum number of users reached for beta.");
                return null; // Reject the addition of a new principal
            };

            // Principal doesn't exist, add them to the HashMap with an empty array of MealRequests
            storedPrincipals.put(principal, []);
            Debug.print("New principal added: " # Principal.toText(principal));
            [];
        };
    };

    // Check if the principal has any MealPlans in `mealGeneration`
    let mealPlans = switch (mealGeneration.get(principal)) {
        case (?plans) {
            // Retrieve the existing MealPlan data
            plans;
        };
        case (null) {
            // No MealPlans found, return an empty array
            [];
        };
    };

    // Return both MealRequest and MealPlan arrays as a tuple
    return ?(mealRequests, mealPlans);
};

public func createMealPlan(
  mealTitle: Text,
  preference: UserPreferences,
  goals: NutritionalGoals,
  principalId: Text,
  override: Bool
): async ?MealPlan {

  let principal = Principal.fromText(principalId);

  switch (storedPrincipals.get(principal)) {
    case (?plans) {
      if (plans.size() > maxMealPlan) {
        throw Error.reject("Maximum plan size reached for beta");
      };

      let existingPlan = Array.find(plans, func(plan: MealRequest): Bool { plan.meal_title == mealTitle });

      switch (existingPlan) {
        case (?plan) {
          if (override) {
            let updatedPlan: MealRequest = {
              meal_title = mealTitle;
              user_preferences = preference;
              nutritional_goals = goals;
              owner = principal;
            };

            let preference_json = "{ \"dietary_restrictions\": \"" # preference.dietary_restrictions # "\", \"allergies\": \"" # preference.allergies # "\", \"favorite_foods\": \"" # preference.favorite_foods # "\", \"disliked_foods\": \"" # preference.disliked_foods # "\", \"mealPlan_purpose\": \"" # preference.mealPlan_purpose # "\", \"country\": \"" # preference.country # "\" }";

            let goals_json = "{ \"caloric_intake\": " # Nat.toText(goals.caloric_intake) # " }";

            let request_body_json = "{ \"meal_title\" : \"" # mealTitle # "\", \"user_preferences\" : " # preference_json # ", \"nutritional_goals\" : " # goals_json # " }";

            let endpoint = "meal-plan";
            let response = await send_http_post_request(request_body_json, endpoint);

            switch (Serde.JSON.fromText(response, null)) {
              case (#err(error)) {
                throw Error.reject("Error in creating Meal Plan");
              };
              case (#ok(blob)) {
                let ai_response: ?MealPlan = from_candid(blob);
                switch (ai_response) {
                  case (?mealPlan) {
                    // Remove the old plan and add the updated plan
                    let updatedPlans = Array.append(
                      Array.filter(plans, func(p: MealRequest): Bool { p.meal_title != mealTitle }),
                      [updatedPlan]
                    );
                    storedPrincipals.put(principal, updatedPlans);

                    // Fetch existing meal plans and append the new one
                    let existingMealPlans = switch (mealGeneration.get(principal)) {
                      case (?plans) { plans };
                      case (null) { [] };
                    };

                    mealGeneration.put(principal, Array.append(existingMealPlans, [mealPlan]));
                    return ai_response;
                  };
                  case (_) {
                    throw Error.reject("AI response was not a valid MealPlan");
                  };
                };
              };
            };
          } else {
            throw Error.reject("Plan with the title exists");
          };
        };
        case (_) {
          let newPlan: MealRequest = {
            meal_title = mealTitle;
            user_preferences = preference;
            nutritional_goals = goals;
            owner = principal;
          };

          storedPrincipals.put(principal, Array.append(plans, [newPlan]));

          let preference_json = "{ \"dietary_restrictions\": \"" # preference.dietary_restrictions # "\", \"allergies\": \"" # preference.allergies # "\", \"favorite_foods\": \"" # preference.favorite_foods # "\", \"disliked_foods\": \"" # preference.disliked_foods # "\", \"mealPlan_purpose\": \"" # preference.mealPlan_purpose # "\", \"country\": \"" # preference.country # "\" }";

          let goals_json = "{ \"caloric_intake\": " # Nat.toText(goals.caloric_intake) # " }";

          let request_body_json = "{ \"meal_title\" : \"" # mealTitle # "\", \"user_preferences\" : " # preference_json # ", \"nutritional_goals\" : " # goals_json # " }";

          let endpoint = "meal-plan";
          let response = await send_http_post_request(request_body_json, endpoint);

          switch (Serde.JSON.fromText(response, null)) {
            case (#err(error)) {
              throw Error.reject("Error in creating Meal Plan");
            };
            case (#ok(blob)) {
              let ai_response: ?MealPlan = from_candid(blob);
              switch (ai_response) {
                case (?mealPlan) {
                  // Fetch existing meal plans and append the new one
                  let existingMealPlans = switch (mealGeneration.get(principal)) {
                    case (?plans) { plans };
                    case (null) { [] };
                  };

                  mealGeneration.put(principal, Array.append(existingMealPlans, [mealPlan]));
                  return ai_response;
                };
                case (_) {
                  throw Error.reject("AI response was not a valid MealPlan");
                };
              };
            };
          };
        };
      };
    };
    case (null) {
      let newPlan: MealRequest = {
        meal_title = mealTitle;
        user_preferences = preference;
        nutritional_goals = goals;
        owner = principal;
      };

      let preference_json = "{ \"dietary_restrictions\": \"" # preference.dietary_restrictions # "\", \"allergies\": \"" # preference.allergies # "\", \"favorite_foods\": \"" # preference.favorite_foods # "\", \"disliked_foods\": \"" # preference.disliked_foods # "\", \"mealPlan_purpose\": \"" # preference.mealPlan_purpose # "\", \"country\": \"" # preference.country # "\" }";

      let goals_json = "{ \"caloric_intake\": " # Nat.toText(goals.caloric_intake) # " }";

      let request_body_json = "{ \"meal_title\" : \"" # mealTitle # "\", \"user_preferences\" : " # preference_json # ", \"nutritional_goals\" : " # goals_json # " }";

      let endpoint = "meal-plan";
      let response = await send_http_post_request(request_body_json, endpoint);

      switch (Serde.JSON.fromText(response, null)) {
        case (#err(error)) {
          throw Error.reject("Error in creating Meal Plan");
        };
        case (#ok(blob)) {
          let ai_response: ?MealPlan = from_candid(blob);
          switch (ai_response) {
            case (?mealPlan) {
              storedPrincipals.put(principal, [newPlan]);

              // Initialize mealGeneration with the new meal plan
              mealGeneration.put(principal, [mealPlan]);
              return ai_response;
            };
            case (_) {
              throw Error.reject("AI response was not a valid MealPlan");
            };
          };
        };
      };
    };
  };
};


public query func getPlan(principalId: Text): async (Nat, [MealResponse]) {
    let principal = Principal.fromText(principalId);
    switch (storedPrincipals.get(principal)) {
        case (?plans) {
            let responses: [MealResponse] = Array.mapFilter(plans, func(plan: MealRequest): ?MealResponse {
                if (plan.owner == principal) {
                    ?{
                        meal_title = plan.meal_title;
                        user_preferences = plan.user_preferences;
                        nutritional_goals = plan.nutritional_goals;
                    };
                } else {
                    null;
                };
            });
            let count = responses.size();
            return (count, responses);
        };
        case (null) {
            return (0, []);
        };
    };
};


    //AI generated plans
public query func get_AI_Meal_Plan(principalId: Text): async (Nat, [MealPlan]) {
    let principal = Principal.fromText(principalId);

    // Fetch the AI-generated meal plans associated with the given principalId
    switch (mealGeneration.get(principal)) {
        case (?plans) {
            let count = plans.size();
            return (count, plans);
        };
        case (null) {
            return (0, []); // No meal plans found for this principal
        };
    };
};




    //Get all the principal 
  // func getAllPrincipals(): async ([Principal], Nat) {
  //     var principals : [Principal] = [];
  //     for (k in storedPrincipals.keys()) {
  //       principals := Array.append(principals, [k]);
  //     };
  //     let count = principals.size();
  //     return (principals, count);
  // };

  public func total_Principals(): async Nat {
      var principals : [Principal] = [];
      // for (k in storedPrincipals.keys()) {
      //   principals := Array.append(principals, [k]);
      // };
      let count = principals.size();
      return count;
  };
  



    //to update the plan
    public func updateMealPlan(
                    mealTitle: Text,
                    preference : UserPreferences,
                    goals : NutritionalGoals,
                    principalId: Text,
                    planId : Nat,
                                ): async Response {
    // Find the plan with the given title
    let principal = Principal.fromText(principalId);
    switch (storedPrincipals.get(principal)) {
      case (?plans) {
        if(planId >= plans.size()){
          return #message ("Plan Not found")
        };
        // Create a new plan with the updated fields
        let updatedPlan: MealRequest = {
                    meal_title = mealTitle;
                    user_preferences = preference;
                    nutritional_goals = goals;
                    owner = principal;
        };
        let new_meal_plans = Array.thaw<MealRequest>(plans);
        new_meal_plans[planId] := updatedPlan;
        storedPrincipals.put(principal, Array.freeze(new_meal_plans));
        return #message ("Plan Updated successfully");
      };
      case (null) {
        return #message("Plan not found");
      };
    };
  };

    // //delete a plan 
    public func deleteMealPlan(principalId: Text, planId: Nat) : async Response {
      let principal = Principal.fromText(principalId);
      switch (storedPrincipals.get(principal)) {
        case (?plans) {
          if(planId < plans.size()){
            let plansList = List.fromArray(plans);
            let plan = plans[planId];
            //does the principal owns the plan?
            if (plan.owner == principal){
              let listFront = List.take(plansList, planId); 
              let listBack = List.drop(plansList, planId + 1);
              let newPlans = List.toArray(List.append(listFront, listBack));
              storedPrincipals.put(principal, newPlans);
              return #message ("Plan Deleted")
            }else{
              return #message ("You do not own this Plan");
            }
          }else{
            return #message ("Plan not found"); 
          }
        };
        case (_) {
          return #message ("User not found");
        };
      };
    };


    public query func planCount(principalId: Text): async Nat {
        let principal = Principal.fromText(principalId);
        
        // Debugging: Print out what is stored in the mealGeneration for the principal
        Debug.print("Checking meal plans for principal: " # Principal.toText(principal));
        
        
        switch (mealGeneration.get(principal)) {
            case (?plans) {
                Debug.print("Number of meal plans found: " # Nat.toText(plans.size()));
                return plans.size();
            };
            case (null) {
                Debug.print("No meal plans found for principal.");
                return 0;
            };
        };
    };



    public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
      let transformed : Types.CanisterHttpResponsePayload = {
          status = raw.response.status;
          body = raw.response.body;
          headers = [
              {
                  name = "Content-Security-Policy";
                  value = "default-src 'self'";
              },
              { name = "Referrer-Policy"; value = "strict-origin" },
              { name = "Permissions-Policy"; value = "geolocation=(self)" },
              {
                  name = "Strict-Transport-Security";
                  value = "max-age=63072000";
              },
              { name = "X-Frame-Options"; value = "DENY" },
              { name = "X-Content-Type-Options"; value = "nosniff" },
          ];
      };
      transformed;
  };

  func send_http_post_request(request_body_json: Text, endpoint: Text) : async Text {

    let ic : Types.IC = actor ("aaaaa-aa");

    let host : Text = "icp-proxy.fly.dev";
    let url = "https://icp-proxy.fly.dev/" # endpoint;

    let idempotency_key: Text = await generateUUID();
    let request_headers = [
        { name = "Host"; value = host },
        { name = "User-Agent"; value = "DietDesigner" },
        { name= "Content-Type"; value = "application/json" },
        { name= "Idempotency-Key"; value = idempotency_key }
    ];

    let request_body_as_Blob: Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8: [Nat8] = Blob.toArray(request_body_as_Blob); // e.g [34, 34,12, 0]

    let transform_context : Types.TransformContext = {
      function = transform;
      context = Blob.fromArray([]);
    };

    let http_request : Types.HttpRequestArgs = {
        url = url;
        max_response_bytes = null; //optional for request
        headers = request_headers;
        //note: type of `body` is ?[Nat8] so you pass it here as "?request_body_as_nat8" instead of "request_body_as_nat8"
        body = ?request_body_as_nat8;
        method = #post;
        transform = ?transform_context;
    };

    Cycles.add(21_850_258_000);

    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    let response_body: Blob = Blob.fromArray(http_response.body);
    let decoded_text: Text = switch (Text.decodeUtf8(response_body)) {
        case (null) { "No value returned" };
        case (?y) { y };
    };

    // Finally, you can return the response of the body.
    let result: Text = decoded_text;
    result
  };

   func generateUUID() : async Text {
    // "UUID-123456789";
      let blob = await Random.blob();
      let fuzz = Fuzz.fromBlob(blob);

      // Generate random alphanumeric text of specific lengths to form a UUID
        let part1 = fuzz.text.randomAlphanumeric(8);    // 8 characters
        let part2 = fuzz.text.randomAlphanumeric(4);    // 4 characters
        let part3 = fuzz.text.randomAlphanumeric(4);    // 4 characters
        let part4 = fuzz.text.randomAlphanumeric(8);    // 4 characters

        // Combine parts into a UUID format
        let uuid = part1 # "-" # part2 # "-" # part3 # "-" # part4  ;
       return uuid
  };
}