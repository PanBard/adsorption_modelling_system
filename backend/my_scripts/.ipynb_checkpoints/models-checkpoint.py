class PredictionClass:
    
    dev_jupyter_flag = True # to change input processing, becouse in flask we get request object and i dont have this object in jupyter

    keras_isotherm_model = None
    keras_isotherm_scaler = None

    keras_19_attributes_model = None
    keras_19_attributes_scaler = None

    keras_isotherm_classifier_model = None
    keras_isotherm_classifier_scaler = None
    keras_isotherm_classifier_label_encoder = None

    activation_agent_classifier_model = None
    activation_agent_classifier_scaler = None
    activation_agent_classifier_label_encoder = None

    material_type_classifier_model = None
    material_type_classifier_scaler = None
    material_type_classifier_label_encoder = None

    material_type_5_output_model = None
    material_type_5_output_scaler = None
    material_type_5_output_encoder = None
    
    material_classifier = None

    x = [0.0000000000,
        0.0086206897,
        0.0172413793,
        0.0258620690,
        0.0344827586,
        0.0689655172,
        0.1034482759,
        0.1379310345,
        0.1724137931,
        0.2068965517,
        0.2413793103,
        0.2758620690,
        0.3103448276,
        0.3448275862,
        0.3793103448,
        0.4137931034,
        0.4482758621,
        0.4827586207,
        0.5172413793,
        0.5517241379,
        0.5862068966,
        0.6206896552,
        0.6551724138,
        0.6896551724,
        0.7241379310,
        0.7586206897,
        0.7931034483,
        0.8275862069,
        0.8620689655,
        0.8965517241,
        0.9310344828,
        0.9655172414,
        1.0000000000]

    output_19_attributes= ["Activation_time[h]", "Activation_temperature[stC]", "Carbonization_temperature[stC]",
                    "Carbonization_time[h]", "Impregnation_ratio[agent/char]", "Nitrogen_doped_ratio", "Nitrogen_content" , "Heating_rate",
                    "Elemental_composition_Carbon", "Elemental_composition_Hydrogen", "Elemental_composition_Oxygen", "Elemental_composition_Nitrogen",
                    "Industrial_composition_moisture", "Industrial_composition_volatiles", "Industrial_composition_ash", "Industrial_composition_fixed_carbon",
                    "Biochemical_composition_content_of_cellulose", "Biochemical_composition_hemicellulose", "Biochemical_composition_lignin"
                    ]  

    output_22_attributes= ["Total_surface_area[m2/g]", "Total_pore_volume[cm3/g]", "Micropore_volume[cm3/g]", 
                       "Activation_time[h]", "Activation_temperature[stC]", "Carbonization_temperature[stC]",
                        "Carbonization_time[h]",
                       "Impregnation_ratio[agent/char]", "Nitrogen_doped_ratio", "Nitrogen_content" , "Heating_rate",                        
                        "Elemental_composition_Carbon", "Elemental_composition_Hydrogen", "Elemental_composition_Oxygen", "Elemental_composition_Nitrogen",         
                        "Industrial_composition_moisture", "Industrial_composition_volatiles", "Industrial_composition_ash", "Industrial_composition_fixed_carbon",
                        "Biochemical_composition_content_of_cellulose", "Biochemical_composition_hemicellulose", "Biochemical_composition_lignin"
                       ]    


    def __init__(self):
        import joblib
        from tensorflow.keras.models import load_model

        # data to article prediction
        self.article_df = self.get_data("article_prediction_data.pkl")


        # keras model - prediction isotherm shape
        self.keras_isotherm_model = self.get_model("isotherm_prediction") 
        self.keras_isotherm_scaler = self.get_scaler("isotherm_prediction")

        # keras model - prediction attributes
        self.keras_19_attributes_model = self.get_model("19_attributes_prediction")
        self.keras_19_attributes_scaler = self.get_scaler("19_attributes_prediction") 

        # keras model - prediction isotherm type
        self.keras_isotherm_classifier_model = self.get_model("isotherm_type_classification")  
        self.keras_isotherm_classifier_scaler = self.get_scaler("isotherm_type_classification") 
        self.keras_isotherm_classifier_label_encoder = self.get_label_encoder("isotherm_type_classification")

        # activation agent classifier
        self.activation_agent_classifier_model = self.get_model("activator_agent") 
        self.activation_agent_classifier_scaler = self.get_scaler("activator_agent")
        self.activation_agent_classifier_label_encoder = self.get_label_encoder("activator_agent")

        # material classifier
        self.material_type_classifier_model = self.get_model("material_type")
        self.material_type_classifier_scaler = self.get_scaler("material_type")
        self.material_type_classifier_label_encoder = self.get_label_encoder("material_type")

        # 5 closest material prediction
        self.material_type_5_output_model_biomass = self.get_model("material_5_output/biomass")
        self.material_type_5_output_scaler_biomass =self.get_scaler("material_5_output/biomass")
        self.material_type_5_output_encoder_biomass =  self.get_label_encoder("material_5_output/biomass")

        self.material_type_5_output_model_coal = self.get_model("material_5_output/coal")
        self.material_type_5_output_scaler_coal =self.get_scaler("material_5_output/coal")
        self.material_type_5_output_encoder_coal =  self.get_label_encoder("material_5_output/coal")

        self.material_type_5_output_model_synthetic = self.get_model("material_5_output/synthetic")
        self.material_type_5_output_scaler_synthetic =self.get_scaler("material_5_output/synthetic")
        self.material_type_5_output_encoder_synthetic = self.get_label_encoder("material_5_output/synthetic")

        # reverse engeenering - isotherm input - 22 output
        self.isotherm_input_22_output_revers_engeen_model = self.get_model("isotherm_input_22_output")
        self.isotherm_input_22_output_revers_engeen_scaler = self.get_scaler("isotherm_input_22_output")

    def get_data(self, file_name):            
        from pathlib import Path
        import joblib
        print(f"\nloading DATA from: {file_name}")
        main_path = Path.cwd() / "models" / "article_data"
        data_path = main_path / file_name 
        loaded_df = joblib.load(data_path)
        print(f"data name: {file_name}")
        print(f"data path: {data_path}")
        return loaded_df

    def get_model(self, folder_name_of_model):
        from pathlib import Path
        print(f"\nloading MODEL from folder: {folder_name_of_model}")
        main_models_path = Path.cwd() / "models" 
        base_path = main_models_path / folder_name_of_model / "best_model"  
        model_name = [p.name for p in sorted(base_path.iterdir()) if p.is_file()]
        best_model_name = model_name[0]
        best_model_path = base_path / best_model_name
        print(f"model folder path: {base_path}")
        print(f"model name: {best_model_name}")
        print(f"model path: {best_model_path}")
        import joblib
        loaded_model = joblib.load(best_model_path)
        return loaded_model

    def get_scaler(self, folder_name_of_scaler):
        from pathlib import Path
        print(f"\nloading SCALER from folder: {folder_name_of_scaler}")
        main_scaler_path = Path.cwd() / "models" 
        base_path = main_scaler_path / folder_name_of_scaler / "scaler"  
        scaler_name = [p.name for p in sorted(base_path.iterdir()) if p.is_file()]
        best_scaler_name = scaler_name[0]
        best_scaler_path = base_path / best_scaler_name
        print(f"scaler folder path: {base_path}")
        print(f"scaler name: {best_scaler_name}")
        print(f"scaler path: {best_scaler_path}")
        import joblib
        loaded_scaler = joblib.load(best_scaler_path)
        return loaded_scaler


    def get_label_encoder(self, folder_name_of_label_encoder):
        from pathlib import Path
        print(f"\nloading LABEL ENCODER from folder: {folder_name_of_label_encoder}")
        main_label_encoder_path = Path.cwd() / "models" 
        base_path = main_label_encoder_path / folder_name_of_label_encoder / "label_encoder"  
        label_encoder_name = [p.name for p in sorted(base_path.iterdir()) if p.is_file()]
        best_label_encoder_name = label_encoder_name[0]
        best_label_encoder_path = base_path / best_label_encoder_name
        print(f"label encoder folder path: {base_path}")
        print(f"label encoder name: {best_label_encoder_name}")
        print(f"label encoder path: {best_label_encoder_path}")
        import joblib
        label_encoder = joblib.load(best_label_encoder_path)
        return label_encoder
    


    def reverse_engineering(self, request):
        import numpy as np
        if(self.dev_jupyter_flag):
            data = request
        else:
            data = request.get_json()

        x_data = data['x']
        y_data = data['y']
        x_data = [float(x) for x in x_data if x.strip() != '']
        y_data = [float(x) for x in y_data if x.strip() != '']
        shaped_y_data = self.shape_isotherm(x_data, y_data)
        output_22_data = self.reverse_engineering_22_outpu_isother_input(shaped_y_data)
        print(f"output_22_data {output_22_data}")
        isotherm_img_base64 = self.make_isotherm_graph(y=y_data,x=x_data, title = "Isotherm")
        isotherm_type = self.classify_isotherm_type(shaped_y_data)
        data_with_7_input_all = [output_22_data[0][1],output_22_data[1][1],output_22_data[2][1],output_22_data[3][1],output_22_data[4][1],output_22_data[5][1],output_22_data[6][1]]
        activation_agent =  self.classify_activation_agent('','', data_with_7_input_all)
        material_type = self.classify_material_type('', '',data_with_7_input_all)
        material_predictions = self.material_5_output_prediction('', '', material_type, output_22_data )
        isotherm_19_features = output_22_data[3:]# Remove first 3 elements

        articles_prediction = self.get_similar_article(shaped_y_data,material_type)
        
        pie_graph_raw_material = self.make_raw_material_composition_pie_graph(isotherm_19_features)
        pie_graph_industrial_composition = self.make_industrial_composition_pie_graph(isotherm_19_features)
        pie_graph_biochemical_composition = self.make_biochemical_composition_pie_graph(isotherm_19_features)

        response_data = {
            "isotherm_22_features": output_22_data,
            "isotherm_type": isotherm_type,
            "image_base64": isotherm_img_base64,
            "material_type": material_type,
            "material_predictions":material_predictions,
            "articles_prediction":articles_prediction,
            "pie_graph_raw_material":pie_graph_raw_material,
            "pie_graph_industrial_composition": pie_graph_industrial_composition,
            "pie_graph_biochemical_composition": pie_graph_biochemical_composition
        }
        return response_data

    def shape_isotherm(self, x_data, y_data):
        import numpy as np
        one_iso_true_v2 = []
        if(len(x_data) == len(y_data)):
            for index, x in enumerate(x_data):
                one_iso_true_v2.append([x, y_data[index]])   
        one_iso_true_v2 = np.array(one_iso_true_v2)
        one_iso_true_v2 = one_iso_true_v2[one_iso_true_v2[:, 0].argsort()]  # sort each isotherm by the first column (X), ensuring clean binning and interpolation.
        one_iso_true_v2 = np.abs(one_iso_true_v2) # convert every element in the array to its absolute value, ensuring no negative numbers remain.
        x2 = one_iso_true_v2[:, 0]
        y2 = one_iso_true_v2[:, 1]
        
        data_do_podzialu_na_przedzialy_oś_x = x2
        data_do_podzialu_na_przedzialy_oś_y = y2
        data  = []
        counter = 0
        poprzednia = 0
        new_x = [] # końcowy zestaw x
        # tworzenie pierwszego zbioru y z wartościami nan 
        for liczba in self.x:
            if(liczba != 0.0 ):
                new_x.append(liczba)
                counter = counter+1
                suma = []
                for i in range(len(data_do_podzialu_na_przedzialy_oś_x)):
                    if(poprzednia<data_do_podzialu_na_przedzialy_oś_x[i]<liczba):
                        suma.append(data_do_podzialu_na_przedzialy_oś_y[i])
                data.append(np.mean(suma))   
                poprzednia = liczba
        
        # wypelnianie pojedzynczych nan, ale zostają grupki nan
        data = np.array(data)
        data = np.insert(data, 0, 0)
        if np.isnan(data[len(data)-1]): # add max value to last index if nan
            data[len(data)-1] = max(data)
        new_data = []
        for index, e in enumerate(data):
            if np.isnan(e) and (not np.isnan(data[index-1])) and (not np.isnan(data[index+1])):
                if index != 0:
                    if not np.isnan(data[index-1]):
                        index_przed = index - 1
                    if not np.isnan(data[index+1]):
                        index_po = index + 1
                        new_men = (np.mean( (data[index_przed] + data[index_po]) ) / 2) 
                        new_data.append(new_men)
            else:
                new_data.append(e)
        # wypelnianie grupek nan i uzyskanie gotowej ostatecznej listy danych
        poczatek_i_koniec_zbioru = []
        tymczasowe_mini_zbiory = []
        for index, e in enumerate(new_data):
            if len(poczatek_i_koniec_zbioru) == 0 :
                    if np.isnan(e) and (not np.isnan(data[index-1])) and (np.isnan(data[index+1])):
                        poczatek_i_koniec_zbioru.append(index)
            if len(poczatek_i_koniec_zbioru) == 1 :
                    if np.isnan(e):
                        tymczasowe_mini_zbiory.append(index)
                    if np.isnan(e) and (np.isnan(data[index-1])) and (not np.isnan(data[index+1])):
                        poczatek_i_koniec_zbioru.append(index)
            if len(poczatek_i_koniec_zbioru) == 2 :
                roznica = (new_data[poczatek_i_koniec_zbioru[1] + 1] - new_data[poczatek_i_koniec_zbioru[0] - 1])
                ile_dodac = roznica / (len(tymczasowe_mini_zbiory)+1)
                for inde in tymczasowe_mini_zbiory:
                    new_data[inde] = new_data[inde-1] + ile_dodac
                poczatek_i_koniec_zbioru = []
                tymczasowe_mini_zbiory = []
        new_x = np.array(new_x)
        new_x = np.insert(new_x, 0, 0)# Insert 0 at the beginning
        new_data = np.array(new_data) 
        # shaped_isotherms.append( new_data ) # only y value
        print(f"len(new_data) {len(new_data)}")
        print(f"new_data {new_data}")
        return new_data

    def reverse_engineering_22_outpu_isother_input(self, isotherm_data):
        import numpy as np
        data_f_scaler = self.isotherm_input_22_output_revers_engeen_scaler.transform([isotherm_data]) # Use the scaler to transform new data
        predictions = self.isotherm_input_22_output_revers_engeen_model.predict(data_f_scaler, verbose=0)
        prediction = predictions[0].tolist()
        
        Elemental_list = [  [11,prediction[11]], [12,prediction[12]], [13,prediction[13]], [14,prediction[14]]  ]
        Elemental_list_sorted = sorted(Elemental_list, key=lambda x: x[1], reverse=True) # Sort by the second item in each sublist, descending
        Elemental_sum = Elemental_list[0][1] + Elemental_list[1][1] + Elemental_list[2][1] + Elemental_list[3][1]
        if(Elemental_sum > 100):
            Elemental_max_index = Elemental_list_sorted[0][0]
            Elemental_max_value = Elemental_list_sorted[0][1]
            Elemental_difference = Elemental_sum - 100
            Elemental_correct_value = Elemental_max_value - Elemental_difference
            prediction[Elemental_max_index] = Elemental_correct_value
            
            # print(f"Elemental_correct_value {Elemental_correct_value}")
            # Elemental_list = [  [11,prediction[11]], [12,prediction[12]], [13,prediction[13]], [14,prediction[14]]  ]
            # print(f"Elemental_list {Elemental_list}")
            # Elemental_sum = Elemental_list[0][1] + Elemental_list[1][1] + Elemental_list[2][1] + Elemental_list[3][1]
            # print(f"Elemental_sum {Elemental_sum}")
        
        Industrial_list = [  [15,prediction[15]], [16,prediction[16]], [17,prediction[17]], [18,prediction[18]]  ]  
        Industrial_list_sorted = sorted(Industrial_list, key=lambda x: x[1], reverse=True) # Sort by the second item in each sublist, descending
        Industrial_sum = Industrial_list[0][1] + Industrial_list[1][1] + Industrial_list[2][1] + Industrial_list[3][1]
        if(Industrial_sum > 100):
            Industrial_max_index = Industrial_list_sorted[0][0]
            Industrial_max_value = Industrial_list_sorted[0][1]
            Industrial_difference = Industrial_sum - 100
            Industrial_correct_value = Industrial_max_value - Industrial_difference
            prediction[Industrial_max_index] = Industrial_correct_value

            
            # print(f"Industrial_correct_value {Industrial_correct_value}")
            # Industrial_list = [  [15,prediction[15]], [16,prediction[16]], [17,prediction[17]], [18,prediction[18]]  ]  
            # print(f"Industrial_list {Industrial_list}")
            # Industrial_sum = Industrial_list[0][1] + Industrial_list[1][1] + Industrial_list[2][1] + Industrial_list[3][1]
            # print(f"Industrial_sum {Industrial_sum}")
        
        Biochemical_list = [  [19,prediction[19]], [20,prediction[20]], [21,prediction[21]]  ]   
        Biochemical_list_sorted = sorted(Biochemical_list, key=lambda x: x[1], reverse=True) # Sort by the second item in each sublist, descending
        Biochemical_sum = Biochemical_list[0][1] + Biochemical_list[1][1] + Biochemical_list[2][1]
        if(Biochemical_sum > 100):
            Biochemical_max_index = Biochemical_list_sorted[0][0]
            Biochemical_max_value = Biochemical_list_sorted[0][1]
            Biochemical_difference = Biochemical_sum - 100
            Biochemical_correct_value = Biochemical_max_value - Biochemical_difference
            prediction[Biochemical_max_index] = Biochemical_correct_value
            
            # print(f"Biochemical_correct_value {Biochemical_correct_value}")
            # Biochemical_list = [  [19,prediction[19]], [20,prediction[20]], [21,prediction[21]]  ]  
            # print(f"Biochemical_list {Biochemical_list}")
            # Biochemical_sum = Biochemical_list[0][1] + Biochemical_list[1][1] + Biochemical_list[2][1]
            # print(f"Biochemical_sum {Biochemical_sum}")


        
        
        print(f"prediction {prediction}")
        export_data = []
        for index, predict in enumerate(prediction):
            export_data.append([self.output_22_attributes[index],round(abs(predict),2)])
        return export_data


# {
#     "bet_value":"1200",
#     "total_pore_value":"1.2",
#     "micropore_value":"0.7"
# }
    

    def make_simulation(self, request):
        import numpy as np
        if(self.dev_jupyter_flag):
            data = request
        else:
            data = request.get_json()  # Get the JSON data
        
        bet_value = data.get('bet_value')
        total_pore_value = data.get('total_pore_value')
        micropore_value = data.get('micropore_value')
        data_array = [float(bet_value), float(total_pore_value), float(micropore_value)]
        data_np_array= np.array(data_array)
        data_from_request_3_value =data_np_array.reshape(1, 3)
        print(f'data_from_request_3_value {data_from_request_3_value}')
        
        isotherm_data = self.predict_isotherm_points(data_from_request_3_value)
        isotherm_type = self.classify_isotherm_type(isotherm_data)
        isotherm_img_base64 = self.make_isotherm_graph(y=isotherm_data, x=self.x)
        isotherm_19_features = self.predict_19_attributes(data_from_request_3_value)
        activation_agent =  self.classify_activation_agent(data_from_request_3_value,isotherm_19_features)
        material_type = self.classify_material_type(data_from_request_3_value, isotherm_19_features)
        material_predictions = self.material_5_output_prediction(data_from_request_3_value, isotherm_19_features, material_type)

        articles_prediction = self.get_similar_article(isotherm_data,material_type)
        
        pie_graph_raw_material = self.make_raw_material_composition_pie_graph(isotherm_19_features)
        pie_graph_industrial_composition = self.make_industrial_composition_pie_graph(isotherm_19_features)
        pie_graph_biochemical_composition = self.make_biochemical_composition_pie_graph(isotherm_19_features)
        response_data = {
            "isotherm_19_features": isotherm_19_features,
            "isotherm_type": isotherm_type,
            "image_base64": isotherm_img_base64,
            "material_type": material_type,
            "material_predictions":material_predictions,
            "articles_prediction":articles_prediction,
            "pie_graph_raw_material":pie_graph_raw_material,
            "pie_graph_industrial_composition": pie_graph_industrial_composition,
            "pie_graph_biochemical_composition": pie_graph_biochemical_composition
        }
        return response_data


    def predict_isotherm_points(self, data_f):
        data_f_scaler = self.keras_isotherm_scaler.transform(data_f) # Use the scaler to transform new data
        predictions = self.keras_isotherm_model.predict(data_f_scaler, verbose=0)
        prediction = predictions[0].tolist()
        print(prediction)
        return prediction 

    def predict_19_attributes(self, data_f):
        data_f_scaler = self.keras_19_attributes_scaler.transform(data_f) # Use the scaler to transform new data
        predictions = self.keras_19_attributes_model.predict(data_f_scaler, verbose=0)
        prediction = predictions[0].tolist()

        Elemental_list = [  [8,prediction[8]], [9,prediction[9]], [10,prediction[10]], [11,prediction[11]]  ]
        Elemental_list_sorted = sorted(Elemental_list, key=lambda x: x[1], reverse=True) # Sort by the second item in each sublist, descending
        Elemental_sum = Elemental_list[0][1] + Elemental_list[1][1] + Elemental_list[2][1] + Elemental_list[3][1]
        if(Elemental_sum > 100):
            Elemental_max_index = Elemental_list_sorted[0][0]
            Elemental_max_value = Elemental_list_sorted[0][1]
            Elemental_difference = Elemental_sum - 100
            Elemental_correct_value = Elemental_max_value - Elemental_difference
            prediction[Elemental_max_index] = Elemental_correct_value
            
            # print(f"Elemental_correct_value {Elemental_correct_value}")
            # Elemental_list = [  [8,prediction[8]], [9,prediction[9]], [10,prediction[10]], [11,prediction[11]]  ]
            # print(f"Elemental_list {Elemental_list}")
            # Elemental_sum = Elemental_list[0][1] + Elemental_list[1][1] + Elemental_list[2][1] + Elemental_list[3][1]
            # print(f"Elemental_sum {Elemental_sum}")
        
        Industrial_list = [  [12,prediction[12]], [13,prediction[13]], [14,prediction[14]], [15,prediction[15]]  ]  
        Industrial_list_sorted = sorted(Industrial_list, key=lambda x: x[1], reverse=True) # Sort by the second item in each sublist, descending
        Industrial_sum = Industrial_list[0][1] + Industrial_list[1][1] + Industrial_list[2][1] + Industrial_list[3][1]
        if(Industrial_sum > 100):
            Industrial_max_index = Industrial_list_sorted[0][0]
            Industrial_max_value = Industrial_list_sorted[0][1]
            Industrial_difference = Industrial_sum - 100
            Industrial_correct_value = Industrial_max_value - Industrial_difference
            prediction[Industrial_max_index] = Industrial_correct_value

            
            # print(f"Industrial_correct_value {Industrial_correct_value}")
            # Industrial_list = [  [12,prediction[12]], [13,prediction[13]], [14,prediction[14]], [15,prediction[15]]  ] 
            # print(f"Industrial_list {Industrial_list}")
            # Industrial_sum = Industrial_list[0][1] + Industrial_list[1][1] + Industrial_list[2][1] + Industrial_list[3][1]
            # print(f"Industrial_sum {Industrial_sum}")
        
        Biochemical_list = [  [16,prediction[16]], [17,prediction[17]], [18,prediction[18]]  ]   
        Biochemical_list_sorted = sorted(Biochemical_list, key=lambda x: x[1], reverse=True) # Sort by the second item in each sublist, descending
        Biochemical_sum = Biochemical_list[0][1] + Biochemical_list[1][1] + Biochemical_list[2][1]
        if(Biochemical_sum > 100):
            Biochemical_max_index = Biochemical_list_sorted[0][0]
            Biochemical_max_value = Biochemical_list_sorted[0][1]
            Biochemical_difference = Biochemical_sum - 100
            Biochemical_correct_value = Biochemical_max_value - Biochemical_difference
            prediction[Biochemical_max_index] = Biochemical_correct_value
            
            # print(f"Biochemical_correct_value {Biochemical_correct_value}")
            # Biochemical_list = [  [16,prediction[16]], [17,prediction[17]], [18,prediction[18]]  ]   
            # print(f"Biochemical_list {Biochemical_list}")
            # Biochemical_sum = Biochemical_list[0][1] + Biochemical_list[1][1] + Biochemical_list[2][1]
            # print(f"Biochemical_sum {Biochemical_sum}")





        
        export_data = []
        for index, predict in enumerate(prediction):
            export_data.append([self.output_19_attributes[index],round(abs(predict),2)])
        return export_data

    def classify_isotherm_type(self, isotherm_data):
        import numpy as np
        data_f_scaler = self.keras_isotherm_classifier_scaler.transform([isotherm_data]) # Use the scaler to transform new data
        predictions = self.keras_isotherm_classifier_model.predict(data_f_scaler, verbose=0)
        prediction = predictions[0].tolist()
        isotherm_type_classes = self.keras_isotherm_classifier_label_encoder.classes_
        isotherm_type_pred = isotherm_type_classes[np.argmax(prediction)]
        print(f'isotherm_type_pred: {isotherm_type_pred}')
        return isotherm_type_pred


    def classify_activation_agent(self, data_f, data_19, data_with_7_input_all = None):
        import numpy as np        
        input_attributes = ["Total_surface_area[m2/g]", "Total_pore_volume[cm3/g]", "Micropore_volume[cm3/g]", 
                       "Activation_time[h]", "Activation_temperature[stC]", "Carbonization_temperature[stC]",
                        "Carbonization_time[h]"] 
        if (data_with_7_input_all):
            data_with_7_input = data_with_7_input_all
        else:
            data_with_7_input = [data_f[0][0],data_f[0][1],data_f[0][2],data_19[0][1],data_19[1][1],data_19[2][1],data_19[3][1]]
        data_f_scaler = self.activation_agent_classifier_scaler.transform([data_with_7_input]) # Use the scaler to transform new data
        # print(f'data_f_scaler {data_f_scaler}')
        predictions = self.activation_agent_classifier_model.predict(data_f_scaler)
        prediction = predictions[0].tolist()
        activation_agent_classes = self.activation_agent_classifier_label_encoder.classes_
        activation_agent_pred = activation_agent_classes[prediction]
        print(f'activation_agent_pred: {activation_agent_pred}')
        return activation_agent_pred

    def classify_material_type(self, data_f, data_19, data_with_7_input_all = None):
        import numpy as np        
        input_attributes = ["Total_surface_area[m2/g]", "Total_pore_volume[cm3/g]", "Micropore_volume[cm3/g]", 
                       "Activation_time[h]", "Activation_temperature[stC]", "Carbonization_temperature[stC]",
                        "Carbonization_time[h]"] 
        if (data_with_7_input_all):
            data_with_7_input = data_with_7_input_all
        else:
            data_with_7_input = [data_f[0][0],data_f[0][1],data_f[0][2],data_19[0][1],data_19[1][1],data_19[2][1],data_19[3][1]]
        data_f_scaler = self.material_type_classifier_scaler.transform([data_with_7_input]) # Use the scaler to transform new data
        # print(f'data_f_scaler {data_f_scaler}')
        predictions = self.material_type_classifier_model.predict(data_f_scaler)
        prediction = predictions[0].tolist()
        material_type_classes = self.material_type_classifier_label_encoder.classes_
        material_type_pred = material_type_classes[prediction]
        print(f'material_type_pred: {material_type_pred}')
        return material_type_pred



    def material_5_output_prediction(self, data_f, data_19, material_type, all_22_input_data = None):
        import numpy as np        
        input_attributes= [ "Total_surface_area[m2/g]", "Total_pore_volume[cm3/g]", "Micropore_volume[cm3/g]",
                        "Activation_time[h]", "Activation_temperature[stC]", "Carbonization_temperature[stC]",
                        "Carbonization_time[h]",
                       
                       "Impregnation_ratio[agent/char]", "Nitrogen_doped_ratio", "Nitrogen_content" , "Heating_rate",
                        
                        "Elemental_composition_Carbon", "Elemental_composition_Hydrogen", "Elemental_composition_Oxygen","Elemental_composition_Nitrogen",
                        
                        "Industrial_composition_moisture", "Industrial_composition_volatiles", "Industrial_composition_ash", "Industrial_composition_fixed_carbon",

                        "Biochemical_composition_content_of_cellulose", "Biochemical_composition_hemicellulose", "Biochemical_composition_lignin"]    
        if (all_22_input_data):
            data_with_22_input = []
            for name, value in all_22_input_data:
                data_with_22_input.append(value)
        else:
            data_19_only_value = []
            for name, value in data_19:
                data_19_only_value.append(value)
            data_19_only_value = np.array(data_19_only_value)
            data_f_array = np.array(data_f[0])
            data_with_22_input = np.concatenate((data_f_array,data_19_only_value))
            
        if(material_type == "biomass"):
            print(f"choosed biomass stack")
            choosed_scaler = self.material_type_5_output_scaler_biomass
            choosed_model = self.material_type_5_output_model_biomass
            choosed_encoder = self.material_type_5_output_encoder_biomass
        elif(material_type == "coal"):
            print(f"choosed coal stack")
            choosed_scaler = self.material_type_5_output_scaler_coal
            choosed_model = self.material_type_5_output_model_coal
            choosed_encoder = self.material_type_5_output_encoder_coal
        elif(material_type == "synthetic"):
            print(f"choosed synthetic stack")
            choosed_scaler = self.material_type_5_output_scaler_synthetic
            choosed_model = self.material_type_5_output_model_synthetic
            choosed_encoder = self.material_type_5_output_encoder_synthetic
            
        
        data_f_scaler = choosed_scaler.transform([data_with_22_input]) # Use the scaler to transform new data
        predictions = choosed_model.predict_proba(data_f_scaler)
        material_type_classes = choosed_encoder.classes_
        sorted_indices = np.argsort(predictions[0])# Get indices that would sort the array in ascending order
        top_5_indices = sorted_indices[-5:][::-1]# Take the last 5 indices (top 5 values), then reverse for descending order
        material_type_pred = []
        for i in top_5_indices:
            material_type_pred.append([material_type_classes[i],float(predictions[0][i])])
        return material_type_pred
    


    def get_similar_article(self, siotherm_input, material_type):
        import numpy as np
        from scipy.spatial.distance import cosine
        input_array = np.array(siotherm_input)
        df_filtered = self.article_df[self.article_df["new_material_type"] == material_type]
        # print(df_filtered.info())
        df_filtered_data_output =  df_filtered[["Sample_name", "Figure_number", "DOI", "PrimaryTitle"]].values.tolist()
        list_of_article = df_filtered[["processed_flatten_isotherm_X_Y"]].values.tolist()
        list_of_article = np.array(list_of_article)
        similarity = []
        for sample in list_of_article:
            e = cosine(sample[0], input_array)
            similarity.append(e)
    
        similarity_np_array = np.array(similarity)
        indexes_of_3_closest_article = np.argsort(similarity_np_array)[:3]
        maxik = similarity_np_array.argmin()

        return_list = [df_filtered_data_output[indexes_of_3_closest_article[0]],df_filtered_data_output[indexes_of_3_closest_article[1]],df_filtered_data_output[indexes_of_3_closest_article[2]]]
        return return_list
    
    
    def make_isotherm_graph(self,y,x,title="Predicted isotherm"):
        import numpy as np
        import matplotlib.pyplot as plt
        import io
        import base64
        plt.figure()
        plt.scatter(x, y,  alpha=0.7, color='g')
        plt.ylabel('Volume adsorbed cm3/g')
        plt.xlabel('Relative pressure P/Po')
        plt.title(title)
        plt.grid(axis='y')
        plt.tight_layout()
        # Save the plot to a BytesIO buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        # Encode as base64
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return img_base64
    
    
    def make_raw_material_composition_pie_graph(self,isotherm_19_features):
        import numpy as np
        import matplotlib.pyplot as plt
        import io
        import base64

        # Data
        labels = ['Carbon', 'Hydrogen', 'Oxygen', 'Nitrogen']
        data = [isotherm_19_features[8][1], isotherm_19_features[9][1], isotherm_19_features[10][1], isotherm_19_features[11][1]]

        sorted_data = sorted(zip(data, labels))  # Sort by values
        values_sorted, labels_sorted = zip(*sorted_data)  # Unzip back

        # Create pie chart
        plt.figure(figsize=(6,6))
        plt.pie(values_sorted, labels=labels_sorted, autopct='%1.1f%%', startangle=140)
        plt.title('Elemental composition of raw material [%]')
        plt.axis('equal')  # Make it a perfect circle
        plt.tight_layout()
                # Save the plot to a BytesIO buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        # Encode as base64
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return img_base64
    

    
    def make_industrial_composition_pie_graph(self,isotherm_19_features):
        import numpy as np
        import matplotlib.pyplot as plt
        import io
        import base64

        # Data
        labels = ['moisture', 'volatiles', 'ash', 'fixed_carbon']
        data = [isotherm_19_features[12][1], isotherm_19_features[13][1], isotherm_19_features[14][1], isotherm_19_features[15][1]]

        sorted_data = sorted(zip(data, labels))  # Sort by values
        values_sorted, labels_sorted = zip(*sorted_data)  # Unzip back

        # Create pie chart
        plt.figure(figsize=(6,6))
        plt.pie(values_sorted, labels=labels_sorted, autopct='%1.1f%%', startangle=140)
        plt.title('Industrial_composition of raw material [%]')
        plt.axis('equal')  # Make it a perfect circle
        plt.tight_layout()
                # Save the plot to a BytesIO buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        # Encode as base64
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return img_base64
    

    def make_biochemical_composition_pie_graph(self,isotherm_19_features):
        import numpy as np
        import matplotlib.pyplot as plt
        import io
        import base64

        # Data
        labels = ['cellulose', 'hemicellulose', 'lignin']
        data = [ isotherm_19_features[16][1], isotherm_19_features[17][1], isotherm_19_features[18][1] ]

        sorted_data = sorted(zip(data, labels))  # Sort by values
        values_sorted, labels_sorted = zip(*sorted_data)  # Unzip back

        # Create pie chart
        plt.figure(figsize=(6,6))
        plt.pie(values_sorted, labels=labels_sorted, autopct='%1.1f%%', startangle=140)
        plt.title('Biochemical composition of raw material [%]')
        plt.axis('equal')  # Make it a perfect circle
        plt.tight_layout()
                # Save the plot to a BytesIO buffer
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)
        # Encode as base64
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        return img_base64
    



